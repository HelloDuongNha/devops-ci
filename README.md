# CI/CD Demo

## Setup

### 1. Create GitHub Repo
1. Go to [github.com](https://github.com)
2. Click **+** → **New repository**
3. Name: `devops-ci` → **Public**
4. Click **Create repository**

### 2. Push Code
```bash
git init
git remote add origin https://github.com/YOUR_USERNAME/devops-ci.git
git branch -m main
git add .
git commit -m "Initial commit"
git push -u origin main
```

### 3. Create Develop Branch
```bash
git checkout -b develop
git push -u origin develop
```

---

## Demo: Show RED Build (Failing Test)

### 1. Create Branch
```bash
git checkout -b demo/failing-test
```

### 2. Add Failing Test
Edit `__tests__/app.test.js`:
```javascript
test('this test will FAIL', () => {
  expect(2 + 2).toBe(5);
});
```

### 3. Test Locally
```bash
npm test
```

### 4. Push to GitHub
```bash
git add .
git commit -m "Add failing test"
git push -u origin demo/failing-test
```

### 5. Create PR
1. Click "Compare & pull request"
2. Click "Create pull request"

### 6. Watch Actions
- Go to **Actions** tab
- See ❌ RED BUILD (test fails)

---

## Demo: Show GREEN Build (Passing Test)

### 7. Fix Test
Edit `__tests__/app.test.js`:
```javascript
test('this test will PASS', () => {
  expect(2 + 2).toBe(4);
});
```

### 8. Push Fix
```bash
git add .
git commit -m "Fix test"
git push
```

### 9. Watch Actions
- PR updates automatically
- See ✅ GREEN BUILD (all pass)


