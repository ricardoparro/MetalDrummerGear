# Setting Up Vercel Deployment Protection Bypass

## Problem

E2E tests need to run against Vercel preview deployments, but deployment protection returns 401 Unauthorized, forcing tests to fall back to production.

This becomes critical when:
- Production is broken (like Issue #422)
- The fix is in a PR that can't pass E2E tests
- Tests fall back to broken production and fail

## Solution

Configure `VERCEL_AUTOMATION_BYPASS_SECRET` to allow CI to access protected preview deployments.

## Setup Steps

### 1. Enable Protection Bypass in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select the **metal-drummer-gear** project
3. Navigate to **Settings** → **Deployment Protection**
4. Find **Protection Bypass for Automation**
5. Click **Enable** or **Generate Secret**
6. Copy the generated secret

### 2. Add Secret to GitHub

1. Go to [GitHub Repository Settings](https://github.com/ricardoparro/MetalDrummerGear/settings/secrets/actions)
2. Click **New repository secret**
3. Name: `VERCEL_AUTOMATION_BYPASS_SECRET`
4. Value: Paste the secret from Vercel
5. Click **Add secret**

### 3. Verify Setup

1. Push a commit to a PR
2. Check the E2E workflow logs
3. Should see: `Using Vercel deployment protection bypass`
4. Tests should run against the preview URL (not production)

## Temporary Workaround

If you can't configure the bypass immediately and need to merge a critical fix:

1. Go to [Actions](https://github.com/ricardoparro/MetalDrummerGear/actions/workflows/e2e-tests.yml)
2. Click **Run workflow**
3. Select the branch with your fix
4. Check **Skip E2E tests**
5. Click **Run workflow**

⚠️ Only use this for verified critical fixes!

## References

- [Vercel Deployment Protection Docs](https://vercel.com/docs/security/deployment-protection)
- [Bypass Methods](https://vercel.com/docs/security/deployment-protection/methods-to-bypass-deployment-protection)
