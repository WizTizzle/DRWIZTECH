# Assessment System Setup Guide

## Quick Start Checklist

- [ ] Apply database migration
- [ ] Get Resend API key
- [ ] Configure Supabase secrets
- [ ] Deploy edge function
- [ ] Test submission

## 1. Apply Database Migration

Run this SQL in your Supabase SQL Editor:

```sql
-- Located in: supabase/migrations/20250516000000_create_assessments_system.sql
-- Creates assessments and assessment_images tables
```

Copy/paste the entire migration file into Supabase Dashboard → SQL Editor → Run

## 2. Get Resend API Key (Free)

1. Sign up at https://resend.com
2. Create API key in dashboard
3. Copy the key (starts with `re_`)
4. Free tier: 3,000 emails/month

**Domain Setup:**
- To send from `assessments@wiztech.zip`, verify domain in Resend
- Or use `onboarding@resend.dev` for testing (update line 193 in edge function)

## 3. Configure Supabase Secrets

Add these in Supabase Dashboard → Edge Functions → Settings:

```
REPAIRDESK_API_KEY=n358ucS-byo7-OUZB-ogJJ-nzDEFjHqV
RESEND_API_KEY=re_YourKeyFromResend
ASSESSMENT_EMAIL=info@wiztech.zip
```

## 4. Deploy Edge Function

**Option A - Supabase Dashboard:**
1. Go to Edge Functions
2. Click "Deploy new function"
3. Name: `submit-assessment`
4. Copy/paste code from `supabase/functions/submit-assessment/index.ts`
5. Deploy

**Option B - Supabase CLI:**
```bash
supabase functions deploy submit-assessment
```

## 5. Test It

1. Fill out assessment on your site
2. Check email at info@wiztech.zip
3. Verify ticket in RepairDesk
4. Check Supabase database

## What Happens When Customer Submits

1. **Database**: Assessment stored in Supabase
2. **RepairDesk**: Ticket auto-created with all info
3. **Email**: Sent to info@wiztech.zip with:
   - Customer & shipping info
   - Device details & assessment
   - Embedded images
   - URLs for CRM copy-paste

## Troubleshooting

**Check Logs:**
```bash
supabase functions logs submit-assessment
```

Or: Supabase Dashboard → Edge Functions → Logs

**Common Issues:**
- **No email?** Check RESEND_API_KEY and domain verification
- **No RepairDesk ticket?** Verify REPAIRDESK_API_KEY
- **Database errors?** Ensure migration was applied

## Files Created

- `supabase/migrations/20250516000000_create_assessments_system.sql` - Database schema
- `supabase/functions/submit-assessment/index.ts` - Edge function
- Updated: `src/components/assessment/AssessmentForm.tsx` - Frontend integration

## Email Preview

Beautiful HTML email includes:
- Header with assessment ID & ticket number
- Severity badge (Basic/Standard/Advanced)
- Customer information section
- Complete shipping address
- Device details & assessment
- Image gallery (embedded)
- Direct URLs for CRM

All formatted for easy copy-paste into RepairDesk or any CRM system.

## Need Help?

1. Check edge function logs first
2. Verify all secrets are correct
3. Test RepairDesk API key separately
4. Confirm Resend domain verified
