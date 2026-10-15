# Contributing to Roadmap App

First off, thank you for considering contributing to Roadmap App! It's people like you that make this tool better for everyone.

## 🎯 Ways to Contribute

- **Bug Reports**: Found a bug? Let us know!
- **Feature Requests**: Have an idea? We'd love to hear it!
- **Code Contributions**: Want to fix a bug or add a feature? Awesome!
- **Documentation**: Help improve our docs
- **Design**: Improve UI/UX
- **Testing**: Help test new features

## 🚀 Getting Started

### 1. Fork the Repository

Click the "Fork" button at the top right of the repository page.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/roadmap-app.git
cd roadmap-app
```

### 3. Set Up Development Environment

Follow the instructions in [SETUP_GUIDE.md](SETUP_GUIDE.md) to set up your local development environment.

### 4. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

## 💻 Development Guidelines

### Code Style

#### TypeScript/JavaScript
- Use TypeScript for all new code
- Follow existing code style
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Keep functions small and focused

#### React Components
- Use functional components with hooks
- Keep components small and reusable
- Use TypeScript interfaces for props
- Follow the existing component structure

#### CSS/Tailwind
- Use Tailwind CSS utility classes
- Follow the existing design system
- Ensure responsive design (mobile, tablet, desktop)
- Test in both light and dark modes

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(ideation): add mind mapping tool
fix(auth): resolve JWT token expiration issue
docs(readme): update installation instructions
refactor(api): simplify project controller logic
```

### Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Aim for good test coverage

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

### Code Review

- All code changes require review
- Address review comments promptly
- Be open to feedback and suggestions
- Keep discussions professional and constructive

## 📝 Pull Request Process

### 1. Update Your Branch

Before creating a PR, make sure your branch is up to date:

```bash
git fetch upstream
git rebase upstream/main
```

### 2. Push Your Changes

```bash
git push origin feature/your-feature-name
```

### 3. Create Pull Request

1. Go to the repository on GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill in the PR template

### PR Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests
- [ ] All tests pass locally
```

### 4. Review Process

- Maintainers will review your PR
- Address any requested changes
- Once approved, your PR will be merged

## 🐛 Reporting Bugs

### Before Submitting

1. Check if the bug has already been reported
2. Try to reproduce the bug
3. Gather relevant information

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., 18.16.0]
- App version: [e.g., 1.0.0]

**Additional context**
Any other relevant information.
```

## 💡 Feature Requests

### Before Submitting

1. Check if the feature has been requested
2. Consider if it fits the project scope
3. Think about implementation details

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
What you want to happen.

**Describe alternatives you've considered**
Other solutions you've thought about.

**Additional context**
Any other relevant information, mockups, etc.
```

## 📚 Documentation

Help improve our documentation:

- Fix typos and grammatical errors
- Clarify confusing sections
- Add examples
- Update outdated information
- Translate documentation

## 🎨 Design Contributions

- Improve UI/UX
- Create mockups for new features
- Suggest design improvements
- Ensure accessibility standards

## 🧪 Testing Contributions

- Write unit tests
- Write integration tests
- Test on different platforms
- Report edge cases

## 🌍 Translation

Help translate the app to other languages:

1. Create a new language file
2. Translate all strings
3. Test the translation
4. Submit a PR

## 📋 Project Structure

Understanding the codebase:

```
roadmap-app/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── store/       # Redux store
│   │   └── hooks/       # Custom hooks
│   └── public/          # Static assets
│
├── server/              # Express backend
│   ├── src/
│   │   ├── controllers/ # Route handlers
│   │   ├── models/      # Database models
│   │   ├── routes/      # API routes
│   │   └── middleware/  # Custom middleware
│   └── tests/           # Backend tests
│
└── shared/              # Shared code
    ├── types/           # TypeScript types
    └── utils/           # Utility functions
```

## 🔒 Security

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email the maintainers directly
3. Provide detailed information
4. Wait for a response before disclosing

## 📞 Getting Help

- **Documentation**: Check our docs first
- **Issues**: Search existing issues
- **Discussions**: Ask questions in GitHub Discussions
- **Discord**: Join our community (if available)

## 🎉 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Given credit in the project

## 📜 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone.

### Our Standards

**Positive behavior:**
- Using welcoming language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community

**Unacceptable behavior:**
- Trolling, insulting/derogatory comments
- Public or private harassment
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Violations may result in:
1. Warning
2. Temporary ban
3. Permanent ban

Report violations to the project maintainers.

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort!

---

**Questions?** Feel free to ask in GitHub Discussions or open an issue.
