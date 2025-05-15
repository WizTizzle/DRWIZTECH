// Update the main form component to include all sections
return (
  <form onSubmit={handleSubmit} className="space-y-8">
    <InitialAssessment
      isAccidentalDeletion={formData.isAccidentalDeletion}
      onChange={(value) => setFormData({ ...formData, isAccidentalDeletion: value })}
    />

    <DeviceTypeSelector
      selectedType={formData.deviceType}
      onChange={(value) => setFormData({ ...formData, deviceType: value })}
    />

    <ModelNumberSection
      hasModelNumber={formData.hasModelNumber}
      modelNumber={formData.modelNumber}
      onHasModelNumberChange={(value) => setFormData({ ...formData, hasModelNumber: value })}
      onModelNumberChange={(value) => setFormData({ ...formData, modelNumber: value })}
    />

    <DeviceSourceSelector
      selectedSource={formData.deviceSource}
      onChange={(value) => setFormData({ ...formData, deviceSource: value })}
    />

    <ComputerTypeSelector
      selectedType={formData.computerType}
      onChange={(value) => setFormData({ ...formData, computerType: value })}
    />

    <RecoveryHistorySelector
      selectedHistory={formData.recoveryHistory}
      onChange={(value) => setFormData({ ...formData, recoveryHistory: value })}
    />

    {formData.recoveryHistory !== 'no' && (
      <CompanyInfoSection
        companyName={formData.companyName}
        diagnosis={formData.companyDiagnosis}
        onCompanyNameChange={(value) => setFormData({ ...formData, companyName: value })}
        onDiagnosisChange={(value) => setFormData({ ...formData, companyDiagnosis: value })}
      />
    )}

    <DamageAssessment
      damageType={formData.damageType}
      onChange={(value) => setFormData({ ...formData, damageType: value })}
    />

    <IssueDescription
      primaryIssue={formData.primaryIssue}
      recoveryAttempts={formData.recoveryAttempts}
      additionalComments={formData.additionalComments}
      onPrimaryIssueChange={(value) => setFormData({ ...formData, primaryIssue: value })}
      onRecoveryAttemptsChange={(value) => setFormData({ ...formData, recoveryAttempts: value })}
      onAdditionalCommentsChange={(value) => setFormData({ ...formData, additionalComments: value })}
    />

    <ContactInfo
      firstName={formData.firstName}
      lastName={formData.lastName}
      email={formData.email}
      emailConfirm={formData.emailConfirm}
      referralSource={formData.referralSource}
      onFirstNameChange={(value) => setFormData({ ...formData, firstName: value })}
      onLastNameChange={(value) => setFormData({ ...formData, lastName: value })}
      onEmailChange={(value) => setFormData({ ...formData, email: value })}
      onEmailConfirmChange={(value) => setFormData({ ...formData, emailConfirm: value })}
      onReferralSourceChange={(value) => setFormData({ ...formData, referralSource: value })}
    />

    <FormActions
      onSave={handleSave}
      onReview={handleReview}
    />
  </form>
);