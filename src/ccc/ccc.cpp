#include <clang-c/Index.h>
#include <iostream>
#include <vector>
#include <string>
#include <cstring>
#include <algorithm>

const std::vector<CXCursorKind> decision_kinds = {
    CXCursor_IfStmt, CXCursor_ForStmt, CXCursor_WhileStmt, CXCursor_DefaultStmt, CXCursor_CaseStmt
};

std::pair<int, int> count_edges_and_nodes(CXCursor cursor) {
    int edges = 0;
    int nodes = 0;

    if (std::find(decision_kinds.begin(), decision_kinds.end(), clang_getCursorKind(cursor)) != decision_kinds.end()) {
        edges += 2;
        nodes += 1;
    }

    std::pair<int, int> edgeNodePair(edges, nodes);

    clang_visitChildren(cursor,
        [](CXCursor child, CXCursor parent, CXClientData client_data) -> CXChildVisitResult {
            auto counts = count_edges_and_nodes(child);
            static_cast<std::pair<int, int>*>(client_data)->first += counts.first;
            static_cast<std::pair<int, int>*>(client_data)->second += counts.second;
            return CXChildVisit_Continue;
        },
        &edgeNodePair
    );

    return edgeNodePair;
}

int compute_cyclomatic_complexity(CXCursor cursor) {
    auto counts = count_edges_and_nodes(cursor);
    const int edges = counts.first;
    const int nodes = counts.second + 1; // +1 for the function entry node
    return edges - nodes + 2;
}

std::string readSourceCode() {
    return std::string((std::istreambuf_iterator<char>(std::cin)), std::istreambuf_iterator<char>());
}

CXUnsavedFile createUnsavedFile(const std::string& code) {
    CXUnsavedFile unsaved_file;
    unsaved_file.Filename = "unsaved.c";
    unsaved_file.Contents = code.c_str();
    unsaved_file.Length = code.length();
    return unsaved_file;
}

CXTranslationUnit parseTranslationUnit(CXIndex index, CXUnsavedFile* unsaved_file) {
    CXTranslationUnit TU;
    CXErrorCode error = clang_parseTranslationUnit2(index, "unsaved.c", nullptr, 0, unsaved_file, 1, CXTranslationUnit_None, &TU);
    if (error != CXError_Success) {
        std::cerr << "Error: Unable to parse translation unit.\n";
        exit(1);
    }
    return TU;
}

void visitChildren(CXCursor root_cursor) {
    clang_visitChildren(root_cursor,
        [](CXCursor cursor, CXCursor parent, CXClientData client_data) -> CXChildVisitResult {
            if (clang_getCursorKind(cursor) == CXCursor_FunctionDecl) {
                CXSourceLocation location = clang_getCursorLocation(cursor);
                unsigned line, column;
                clang_getSpellingLocation(location, NULL, &line, &column, NULL);
                int complexity = compute_cyclomatic_complexity(cursor);
                std::cout << line << " " << complexity << std::endl;
            }
            return CXChildVisit_Continue;
        },
        nullptr
    );
}

int main() {
    std::string code = readSourceCode();
    CXUnsavedFile unsaved_file = createUnsavedFile(code);
    
    CXIndex index = clang_createIndex(0, 0);
    CXTranslationUnit TU = parseTranslationUnit(index, &unsaved_file);
    
    CXCursor root_cursor = clang_getTranslationUnitCursor(TU);
    visitChildren(root_cursor);
    
    clang_disposeTranslationUnit(TU);
    clang_disposeIndex(index);
    return 0;
}
