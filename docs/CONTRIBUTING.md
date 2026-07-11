# Contributing to DarkMap

Thank you for your interest in contributing to **DarkMap**!
This document outlines the process for submitting bug reports, feature requests,
and pull requests.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Requesting Features](#requesting-features)
  - [Submitting Pull Requests](#submitting-pull-requests)
- [Development Workflow](#development-workflow)
- [Commit Message Convention](#commit-message-convention)
- [Code Style Guidelines](#code-style-guidelines)
- [Branch Naming](#branch-naming)

---

## Code of Conduct

This project follows the principle of respectful, inclusive collaboration.
By participating, you agree to:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what is best for the project

---

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/DarkMap.git
   cd DarkMap
   ```
3. **Set up** both the backend and frontend (see [`INSTALLATION.md`](INSTALLATION.md))
4. **Create** a new branch for your work

---

## How to Contribute

### Reporting Bugs

If you find a bug, please open a **GitHub Issue** with:

- A clear, descriptive title
- Steps to reproduce the issue
- Expected behaviour vs actual behaviour
- Your environment (OS, Python version, Node version, browser)
- Screenshots or error logs if available

### Requesting Features

Open a **GitHub Issue** tagged with `enhancement` and describe:

- The problem you want to solve
- Your proposed solution
- Any alternatives you considered
- Whether you're willing to implement it yourself

### Submitting Pull Requests

1. **Fork and clone** the repository (see above)
2. **Create a branch** from `main` (see [Branch Naming](#branch-naming))
3. **Make your changes** — keep each PR focused on a single concern
4. **Test** your changes thoroughly
5. **Commit** using the Conventional Commits format (see below)
6. **Push** to your fork: `git push origin <your-branch>`
7. **Open a Pull Request** against the `main` branch of this repository

#### Pull Request Checklist

Before submitting, ensure:

- [ ] Changes are limited to the scope of the PR
- [ ] No existing functionality is broken
- [ ] New files follow the existing folder structure
- [ ] Commit messages follow Conventional Commits
- [ ] The PR description explains what changed and why

---

## Development Workflow

```
main  ←── (protected)
  └── feature/your-feature-name
  └── fix/issue-description
  └── docs/update-readme
  └── refactor/component-name
```

1. Always branch off `main`
2. Keep your branch up to date with `main`:
   ```bash
   git fetch origin
   git rebase origin/main
   ```
3. Open a PR early (as a Draft) if you want early feedback

---

## Commit Message Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/).

**Format:**
```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

**Types:**

| Type | When to Use |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes only |
| `style` | Formatting changes (no logic change) |
| `refactor` | Code restructuring (no feature/bug change) |
| `test` | Adding or updating tests |
| `chore` | Build process or tooling changes |

**Examples:**

```bash
feat(backend): add date-range filter to /incidents endpoint
fix(frontend): resolve leaflet marker icon not rendering
docs(readme): add docker-compose setup instructions
refactor(components): extract severity legend into its own component
```

---

## Code Style Guidelines

### Python (Backend)

- Follow [PEP 8](https://peps.python.org/pep-0008/)
- Use type hints on all function signatures
- Keep functions focused and small
- Use descriptive variable names

### JavaScript / JSX (Frontend)

- Use `const` over `let`; avoid `var`
- Prefer arrow functions for component callbacks
- Keep components under 100 lines where possible
- Use `useMemo` and `useCallback` for expensive computations
- Follow the existing import order: React → libraries → local components → utils

---

## Branch Naming

| Pattern | Example |
|---|---|
| `feature/<short-name>` | `feature/heatmap-layer` |
| `fix/<issue-or-description>` | `fix/marker-icon-not-loading` |
| `docs/<what-is-updated>` | `docs/api-reference` |
| `refactor/<component>` | `refactor/crime-filters` |
| `chore/<task>` | `chore/update-dependencies` |

---

Thank you for helping make DarkMap better! 🗺️

*Back to [README](../README.md)*
