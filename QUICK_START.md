# ⚡ Quick Start - Assessment System

## 🎯 Current Status

**✅ READY TO DEPLOY** - Code is complete and builds successfully!

---

## 📝 3-Step Deploy (15 minutes)

### 1️⃣ Get Resend API Key
- Sign up: https://resend.com/signup
- Create API key
- Copy it (starts with `re_`)

### 2️⃣ Add Secrets to Supabase
Go to: https://supabase.com/dashboard → Your Project → Edge Functions → Settings

Add these 3 secrets:
```
REPAIRDESK_API_KEY = n358ucS-byo7-OUZB-ogJJ-nzDEFjHqV
RESEND_API_KEY = re_YourKeyHere
ASSESSMENT_EMAIL = info@wiztech.zip
```

### 3️⃣ Deploy Edge Function
1. Supabase → Edge Functions → "Deploy new function"
2. Name: `submit-assessment`
3. Copy code from: `supabase/functions/submit-assessment/index.ts`
4. Paste and deploy

---

## ✨ What You Get

Every assessment submission automatically:
- ✅ Creates RepairDesk ticket
- ✅ Sends beautiful HTML email to info@wiztech.zip
- ✅ Includes all customer data
- ✅ Embeds device images
- ✅ Shows severity level
- ✅ Ready to copy-paste into CRM

---

## 🔧 Your Settings

- **RepairDesk API Key:** Already configured ✅
- **Email Recipient:** info@wiztech.zip ✅
- **Edge Function:** Ready to deploy ✅
- **Frontend:** Updated to use Supabase ✅

---

## 📧 Email Preview

Subject: `🔧 New Assessment - STANDARD (Ticket #12345)`

Beautiful HTML email with:
- Customer name, email, phone
- Complete shipping address
- Device type and condition
- Assessment results
- Device photos (embedded!)
- Previous recovery attempts
- Next steps

---

## 🚨 Troubleshooting

**No email?**
- Check Resend dashboard logs
- Verify RESEND_API_KEY in Supabase
- Check spam folder

**No RepairDesk ticket?**
- Check edge function logs in Supabase
- Verify REPAIRDESK_API_KEY

**View Logs:**
Supabase → Edge Functions → submit-assessment → Logs

---

## 📚 Full Documentation

See `DEPLOYMENT_GUIDE.md` for complete details, troubleshooting, and examples.

---

## ⏱️ Time Estimate

- Get Resend key: 2 min
- Add Supabase secrets: 3 min
- Deploy edge function: 5 min
- Test: 2 min
- **Total: ~15 minutes**

---

## 💰 Cost

**$0** - Resend free tier includes 3,000 emails/month (plenty!)

---

## ✅ Deployment Checklist

- [ ] Got Resend API key
- [ ] Added all 3 secrets to Supabase
- [ ] Deployed edge function
- [ ] Tested with real submission
- [ ] Received email at info@wiztech.zip
- [ ] Saw RepairDesk ticket created

---

**Ready? Start with Step 1 above! 🚀**
