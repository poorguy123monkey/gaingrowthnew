# Contributing to GainGrowth Panel

Thank you for your interest in contributing to the GainGrowth Panel! We appreciate your time and effort in making this project better. This document provides guidelines for contributing to the project.

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md). Please report any unacceptable behavior to [your-email@example.com].

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/your-username/gaingrowth-panel.git
   cd gaingrowth-panel
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Create a branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b bugfix/issue-number-short-description
   ```

## Development Workflow

1. **Start the development server**:
   ```bash
   npm run dev
   ```
   This will start the development server at `http://localhost:3000`

2. **Run tests** (if available):
   ```bash
   npm test
   ```

3. **Lint your code**:
   ```bash
   npm run lint
   ```

4. **Format your code**:
   ```bash
   npm run format
   ```

## Making Changes

1. **Write clear commit messages**:
   - Use the present tense ("Add feature" not "Added feature")
   - Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
   - Limit the first line to 72 characters or fewer
   - Reference issues and pull requests liberally

2. **Keep your fork in sync** with the original repository:
   ```bash
   git remote add upstream https://github.com/original-owner/gaingrowth-panel.git
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

3. **Push** your changes to your fork:
   ```bash
   git push origin your-branch-name
   ```

## Submitting a Pull Request

1. **Create a Pull Request** (PR) from your fork to the original repository
2. **Fill out the PR template** with all relevant information
3. **Reference any related issues** using keywords (e.g., "Fixes #123")
4. **Request reviews** from maintainers if needed
5. **Address any feedback** and update your PR as necessary

## Development Guidelines

- Follow the existing code style and formatting
- Write clear, concise, and meaningful commit messages
- Add or update tests for new features and bug fixes
- Update documentation when necessary
- Keep the codebase clean and well-organized
- Follow security best practices

## Reporting Issues

When creating an issue, please include:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected vs. actual behavior
- Screenshots or screen recordings if applicable
- Browser/OS version if relevant
- Any error messages or logs

## License

By contributing to this project, you agree that your contributions will be licensed under the [MIT License](LICENSE).

## Thank You!

Your contributions make this project better for everyone. Thank you for your time and effort!
