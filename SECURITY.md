# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| latest  | :white_check_mark: |

## Reporting a Vulnerability

We take the security of the Dev Weekends platform seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### How to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to **info@devweekends.com** with the subject line: `[SECURITY] Vulnerability Report`.

Please include the following information in your report:

- **Type of vulnerability** (e.g., SQL injection, XSS, authentication bypass, etc.)
- **Full paths of source file(s)** related to the vulnerability
- **Location of the affected source code** (tag/branch/commit or direct URL)
- **Step-by-step instructions** to reproduce the issue
- **Proof-of-concept or exploit code** (if possible)
- **Impact of the vulnerability**, including how an attacker might exploit it

### What to Expect

- **Acknowledgment**: We will acknowledge receipt of your vulnerability report within 48 hours.
- **Communication**: We will keep you informed about the progress toward a fix.
- **Timeline**: We aim to resolve critical vulnerabilities within 7 days and other vulnerabilities within 30 days.
- **Credit**: If you would like to be credited for the discovery, please let us know how you would like to be identified.

### Safe Harbor

We support safe harbor for security researchers who:

- Make a good faith effort to avoid privacy violations, destruction of data, and interruption or degradation of our services.
- Only interact with accounts you own or with explicit permission of the account holder.
- Do not exploit a security issue you discover for any reason other than testing.
- Report any vulnerability you've discovered promptly.
- Do not violate any other applicable laws or regulations.

We will not pursue legal action against researchers who discover and report security vulnerabilities in accordance with this policy.

## Security Best Practices for Contributors

When contributing to this project, please keep these security practices in mind:

### Environment Variables

- Never commit `.env.local` or any files containing secrets to the repository
- Use `.env.example` as a template, but never include real values
- Keep secrets out of client-side code (use `NEXT_PUBLIC_` prefix only for public values)

### Authentication & Authorization

- Always validate user input on the server side
- Use parameterized queries to prevent injection attacks
- Implement proper role-based access control
- Never expose sensitive information in error messages

### Dependencies

- Keep dependencies up to date
- Run `npm audit` regularly to check for vulnerabilities
- Review dependency changes in pull requests

### API Security

- Validate and sanitize all API inputs
- Use appropriate rate limiting
- Implement proper CORS policies
- Never trust client-side data

## Security Features

This project implements the following security measures:

- JWT-based authentication with secure token handling
- Role-based access control (Admin, Mentor, Ambassador)
- Protected API routes with middleware authentication
- Input validation and sanitization
- Secure password hashing with bcrypt

## Contact

For any security-related questions or concerns, please contact us at **info@devweekends.com**.


