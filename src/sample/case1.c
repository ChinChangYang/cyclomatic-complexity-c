void empty() {}

void one_if() {
    if (true) {}
}

void two_ifs() {
    if (true) {}
    if (true) {}
}

void one_for() {
    for (int i = 0; i < 10; i++) {}
}

void nested_if() {
    if (true) {
        if (true) {}
    }
}

void nested() {
    if (true) {
        while (false) {
            for (int i = 0; i < 10; i++) {}
        }
    }
}

void ternary() {
    int a = 10;
    int b = (a == 10) ? 20 : 30;
}

void multi_conditions() {
    int a = 10, b = 20;
    if (a == 10 && b == 20) {}
    if (a == 10 || b == 20) {}
}

void recursive(int n) {
    if (n > 0) {
        recursive(n - 1);
    }
}

void test_goto() {
    int a = 0;
    if (a == 0) {
        goto label;
    }
    a++;
    label: return;
}

void error_handling(int a) {
    if (a < 0) {
        return;
    }
    a++;
}
