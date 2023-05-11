from clang.cindex import Index, CursorKind
import sys

def count_edges_and_nodes(node):
    decision_kinds = [
        CursorKind.IF_STMT, CursorKind.FOR_STMT, 
        CursorKind.WHILE_STMT, CursorKind.DEFAULT_STMT, 
        CursorKind.CASE_STMT
    ]

    edges = 0
    nodes = 0  

    if node.kind in decision_kinds:
        edges += 2
        nodes += 1  

    for child in node.get_children():
        child_edges, child_nodes = count_edges_and_nodes(child)
        edges += child_edges
        nodes += child_nodes

    return edges, nodes

def compute_cyclomatic_complexity(node):
    edges, nodes = count_edges_and_nodes(node)
    nodes = nodes + 1
    return edges - nodes + 2

index = Index.create()
translation_unit = index.parse(sys.argv[1])

for cursor in translation_unit.cursor.get_children():
    if cursor.kind == CursorKind.FUNCTION_DECL:
        complexity = compute_cyclomatic_complexity(cursor)
        start_line = cursor.location.line
        print(f"{start_line} {complexity}")
