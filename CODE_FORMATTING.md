# Code Formatting Configuration

## Overview

This project uses consistent code formatting to maintain code quality and readability. The autofix notifications you see are from the IDE automatically formatting code to match the project standards.

## Configuration Files

### 1. `.prettierrc`

Defines the code formatting rules:

- 2 spaces for indentation
- Semicolons required
- Double quotes for strings
- 80 character line width
- LF line endings

### 2. `.editorconfig`

Ensures consistent coding styles across different editors:

- UTF-8 charset
- LF line endings
- 2 space indentation
- Trim trailing whitespace

### 3. `.vscode/settings.json`

VSCode-specific settings:

- Format on save enabled
- Prettier as default formatter
- Auto-fix on save

## How to Avoid Autofix Notifications

### Option 1: Write Pre-Formatted Code

The code is already following the formatting rules, so future edits should not trigger autofix if you:

- Use 2 spaces for indentation
- Add semicolons at the end of statements
- Use double quotes for strings
- Keep lines under 80 characters when possible

### Option 2: Disable Format on Save (Not Recommended)

If you prefer to format manually, update `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": false
}
```

### Option 3: Format Before Saving

Run Prettier manually before saving:

- Command Palette: `Format Document`
- Keyboard: `Shift + Alt + F` (Windows/Linux) or `Shift + Option + F` (Mac)

## Why Autofix Happens

The IDE automatically formats code when:

1. You save a file
2. The code doesn't match the formatting rules
3. Format on save is enabled

## Benefits of Auto-Formatting

- **Consistency**: All code follows the same style
- **Readability**: Easier to read and understand
- **Collaboration**: Team members see consistent formatting
- **Less Debate**: No arguments about code style
- **Focus**: Spend time on logic, not formatting

## Current Status

All configuration files are now in place:

- ✅ `.prettierrc` - Prettier configuration
- ✅ `.prettierignore` - Files to ignore
- ✅ `.editorconfig` - Editor configuration
- ✅ `.vscode/settings.json` - VSCode settings

The code I write now follows these rules, so you should see fewer autofix notifications going forward.

## Troubleshooting

### Still Seeing Notifications?

1. Restart VSCode/Kiro IDE
2. Ensure Prettier extension is installed
3. Check that `.prettierrc` is in the project root
4. Verify `.vscode/settings.json` has correct settings

### Want Different Formatting?

Edit `.prettierrc` to change rules:

```json
{
  "semi": false, // Remove semicolons
  "singleQuote": true, // Use single quotes
  "tabWidth": 4, // Use 4 spaces
  "printWidth": 120 // 120 character lines
}
```

## Manual Formatting Commands

### Format Entire Project

```bash
# Frontend
cd frontend
npx prettier --write "src/**/*.{js,jsx,json,css}"

# Backend
cd backend
npx prettier --write "**/*.{js,json}"
```

### Check Formatting Without Changing

```bash
npx prettier --check "src/**/*.{js,jsx}"
```

## Recommendation

Keep autofix enabled - it ensures code quality and consistency without manual effort. The notifications will decrease as the codebase becomes more consistent with the formatting rules.
