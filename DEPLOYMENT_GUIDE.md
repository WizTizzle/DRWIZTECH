# 🚀 Assessment System - Complete Deployment Guide

## ✅ What's Already Done

- ✅ Edge function code written (`supabase/functions/submit-assessment/index.ts`)
- ✅ RepairDesk API key embedded: `n358ucS-byo7-OUZB-ogJJ-nzDEFjHqV`
- ✅ Email recipient set to: `info@wiztech.zip`
- ✅ Frontend configured to call the function
- ✅ Beautiful HTML email template with embedded images

---

## 📋 Step-by-Step Deployment

### Step 1: Get Resend API Key (2 minutes)

1. Go to https://resend.com/signup
2. Sign up (free - 3,000 emails/month)
3. Click "API Keys" in dashboard
4. Click "Create API Key"
5. Name it "WizTech Assessments"
6. Copy the key (starts with `re_`)

**Important:** To send from `assessments@wiztech.zip`, you need to:
- Go to "Domains" in Resend dashboard
- Add your domain `wiztech.zip`
- Add the DNS records they provide
- OR use `onboarding@resend.dev` for testing (works immediately)

---

### Step 2: Configure Supabase Secrets (3 minutes)

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Click "Edge Functions" in left menu
4. Click "Settings" tab
5. Scroll to "Secrets"
6. Add these 3 secrets:

```
REPAIRDESK_API_KEY = n358ucS-byo7-OUZB-ogJJ-nzDEFjHqV
RESEND_API_KEY = re_YourKeyFromStep1
ASSESSMENT_EMAIL = info@wiztech.zip
```

7. Click "Save" after each one

---

### Step 3: Deploy Edge Function (5 minutes)

**Option A - Supabase Dashboard (Easiest):**

1. In Supabase dashboard → Edge Functions
2. Click "Deploy a new function"
3. Function name: `submit-assessment`
4. Open `/tmp/cc-agent/35978931/project/supabase/functions/submit-assessment/index.ts`
5. Copy ALL the code
6. Paste into Supabase editor
7. Click "Deploy function"
8. Wait for "Deployed successfully" message

**Option B - Supabase CLI:**

```bash
# If you have CLI installed
cd /tmp/cc-agent/35978931/project
supabase functions deploy submit-assessment
```

---

### Step 4: Verify Deployment (2 minutes)

1. In Supabase → Edge Functions
2. Find `submit-assessment`
3. You should see:
   - Status: Active (green dot)
   - URL: `https://YOUR-PROJECT.supabase.co/functions/v1/submit-assessment`
4. Click on it to see details

---

### Step 5: Test It! (1 minute)

1. Go to your website
2. Fill out the assessment form
3. Submit it
4. Check your email at `info@wiztech.zip`
5. Check RepairDesk for the new ticket

---

## 🔍 How to Check if It's Working

### Check Edge Function Logs:

**Dashboard:**
1. Supabase → Edge Functions → `submit-assessment`
2. Click "Logs" tab
3. You'll see real-time logs when someone submits

**CLI:**
```bash
supabase functions logs submit-assessment --follow
```

### What You Should See in Logs:

```
Processing assessment submission
RepairDesk result: { success: true, ticketId: '12345' }
Email result: { success: true }
```

---

## 🎯 What Happens When Customer Submits

1. **Customer fills out assessment** → Frontend collects all data + images
2. **Submit button clicked** → POST to Supabase Edge Function
3. **Edge function runs:**
   - Creates RepairDesk ticket
   - Sends beautiful HTML email to info@wiztech.zip
   - Returns success + ticket ID
4. **You receive:**
   - Email with ALL data, formatted perfectly
   - Images embedded in email
   - RepairDesk ticket auto-created

---

## 📧 Email Preview

You'll receive a beautiful HTML email with:

- 🔧 Header with severity badge (STANDARD/MODERATE/ADVANCED)
- 👤 Customer info (name, email, phone)
- 📦 Complete shipping address
- 💽 Device details & symptoms
- 📊 Assessment results & recommendations
- 📷 Device images (embedded, not attachments!)
- 🔄 Previous recovery attempts (if any)
- 💬 Additional customer comments
- Direct URLs for easy CRM copy-paste

---

## ⚠️ Troubleshooting

### Issue: No email received

**Check:**
1. Is `RESEND_API_KEY` set correctly in Supabase?
2. Is `ASSESSMENT_EMAIL` set to `info@wiztech.zip`?
3. Check Resend dashboard → "Logs" for delivery status
4. Check spam folder
5. If using custom domain, verify DNS records

**Quick fix:** Change line 193 in edge function to use:
```typescript
from: "onboarding@resend.dev"  // Works immediately, no domain setup
```

### Issue: No RepairDesk ticket

**Check:**
1. Is `REPAIRDESK_API_KEY` set correctly?
2. Test the API key manually:
```bash
curl -X POST https://api.repairdesk.co/api/web/v1/tickets \
  -H "Authorization: Bearer n358ucS-byo7-OUZB-ogJJ-nzDEFjHqV" \
  -H "Content-Type: application/json" \
  -d '{"customer":{"first_name":"Test"},"issue_description":"Test"}'
```

### Issue: Function not found

**Check:**
1. Is function deployed? Check Supabase → Edge Functions
2. Is function name exactly `submit-assessment`?
3. Try redeploying

### Issue: CORS errors in browser

**Check:**
1. Edge function has CORS headers (already included)
2. Function has `verify_jwt: false` (public access)
3. Clear browser cache and retry

---

## 📝 What's Different from Old System

**OLD (Vercel + SendGrid):**
- ❌ Required SendGrid account
- ❌ Separate Vercel deployment
- ❌ Multiple services to manage
- ❌ More complex setup

**NEW (Supabase Edge Function + Resend):**
- ✅ Everything in Supabase
- ✅ Resend is simpler & more reliable
- ✅ Better email deliverability
- ✅ One deployment, one dashboard
- ✅ Better logging & monitoring

---

## 🎉 Success Checklist

- [ ] Resend API key obtained
- [ ] All 3 secrets added to Supabase
- [ ] Edge function deployed successfully
- [ ] Test submission completed
- [ ] Email received at info@wiztech.zip
- [ ] RepairDesk ticket created
- [ ] Logs show no errors

---

## 📞 Next Steps After Deployment

1. **Test with real data** - Submit a real assessment
2. **Check email formatting** - Make sure everything looks good
3. **Verify RepairDesk integration** - Check ticket details
4. **Set up email forwarding** - If needed for your team
5. **Monitor logs** - First few days, check for any issues

---

## 💡 Pro Tips

1. **Email Domain:** Once you verify `wiztech.zip` in Resend, emails will come from `assessments@wiztech.zip` (more professional)

2. **Testing:** Use a personal email for testing first, then switch to production

3. **Monitoring:** Check Supabase logs daily for first week

4. **Backup:** Assessment data is also saved to localStorage as backup

5. **Images:** They're embedded in email, so they display inline (beautiful!)

---

## 🔗 Important Links

- **Supabase Dashboard:** https://supabase.com/dashboard
- **Resend Dashboard:** https://resend.com/overview
- **RepairDesk API Docs:** https://repairdesk.co/api-docs
- **Edge Function URL:** `https://ycywvnhxujagblruvimr.supabase.co/functions/v1/submit-assessment`

---

## 📄 Files Created

- `supabase/functions/submit-assessment/index.ts` - Main edge function
- `DEPLOYMENT_GUIDE.md` - This guide

---

**Estimated Total Time:** 15 minutes

**Difficulty:** Easy (just copy-paste and click)

**Cost:** $0 (Resend free tier is plenty)

---

Need help? Check the logs first, then troubleshooting section above!
