import subprocess

def test_calculate_cyclomatic_complexity():
    # Run your script on the C file containing the test cases
    result = subprocess.run(['python', 'ccc.py', 'sample/case1.cpp'], stdout=subprocess.PIPE)

    # Extract the cyclomatic complexity for each function from the output
    complexities = list(map(int, result.stdout.decode().split()[1::2]))

    # Check that the cyclomatic complexity is calculated correctly
    assert complexities == [1, 2, 3, 2, 3], f"Expected [1, 2, 3, 2, 3], but got {complexities}"

if __name__ == "__main__":
    test_calculate_cyclomatic_complexity()
