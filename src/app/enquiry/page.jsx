'use client'

import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { CheckCircle, ArrowRight, ArrowLeft, User, FileText, DollarSign, Eye } from 'lucide-react'
import { generateRefNumber } from '@/lib/utils'

const STEPS = [
  { id: 1, title: 'Personal Info', icon: User },
  { id: 2, title: 'Loan Details', icon: FileText },
  { id: 3, title: 'Financial Info', icon: DollarSign },
  { id: 4, title: 'Review', icon: Eye },
]

// ── Step 1 ─────────────────────────────────────────────────────────────────
function StepPersonal({ register, errors, watch }) {
  const employmentType = watch('employmentType')
  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">First Name *</label>
          <input
            className="input-field"
            placeholder="Rajesh"
            {...register('firstName', { required: 'First name is required' })}
          />
          {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">Last Name *</label>
          <input
            className="input-field"
            placeholder="Kumar"
            {...register('lastName', { required: 'Last name is required' })}
          />
          {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">Date of Birth *</label>
          <input
            type="date"
            className="input-field"
            {...register('dob', { required: 'Date of birth is required' })}
          />
          {errors.dob && <p className="text-red-400 text-xs mt-1">{errors.dob.message}</p>}
        </div>
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">Gender *</label>
          <select
            className="input-field"
            {...register('gender', { required: 'Please select gender' })}
          >
            <option value="" style={{ background: '#0A1628' }}>Select gender</option>
            <option value="male" style={{ background: '#0A1628' }}>Male</option>
            <option value="female" style={{ background: '#0A1628' }}>Female</option>
            <option value="other" style={{ background: '#0A1628' }}>Other</option>
          </select>
          {errors.gender && <p className="text-red-400 text-xs mt-1">{errors.gender.message}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">PAN Number *</label>
          <input
            className="input-field uppercase"
            placeholder="ABCDE1234F"
            maxLength={10}
            {...register('pan', {
              required: 'PAN number is required',
              pattern: { value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, message: 'Enter valid PAN (e.g. ABCDE1234F)' },
            })}
          />
          {errors.pan && <p className="text-red-400 text-xs mt-1">{errors.pan.message}</p>}
        </div>
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">Mobile Number *</label>
          <input
            type="tel"
            className="input-field"
            placeholder="+91 9876543210"
            {...register('mobile', {
              required: 'Mobile number is required',
              pattern: { value: /^[6-9]\d{9}$/, message: 'Enter valid 10-digit mobile number' },
            })}
          />
          {errors.mobile && <p className="text-red-400 text-xs mt-1">{errors.mobile.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-white/60 text-sm font-medium mb-2">Email Address *</label>
        <input
          type="email"
          className="input-field"
          placeholder="rajesh@example.com"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter valid email' },
          })}
        />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-white/60 text-sm font-medium mb-2">Employment Type *</label>
        <div className="grid grid-cols-3 gap-3">
          {['Salaried', 'Self-Employed', 'Business Owner'].map((type) => (
            <label key={type} className="cursor-pointer">
              <input type="radio" value={type} className="sr-only" {...register('employmentType', { required: true })} />
              <div
                className="p-3 rounded-xl text-center text-sm transition-all duration-200 border"
                style={{
                  background: employmentType === type ? 'rgba(30,111,255,0.2)' : 'rgba(255,255,255,0.04)',
                  border: employmentType === type ? '1px solid rgba(30,111,255,0.5)' : '1px solid rgba(255,255,255,0.10)',
                  color: employmentType === type ? '#4D8FFF' : 'rgba(255,255,255,0.6)',
                }}
              >
                {type}
              </div>
            </label>
          ))}
        </div>
        {errors.employmentType && <p className="text-red-400 text-xs mt-1">Please select employment type</p>}
      </div>
    </div>
  )
}


// ── Step 2 ─────────────────────────────────────────────────────────────────
function StepLoanDetails({ register, errors, watch }) {
  const loanType = watch('loanType')
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-white/60 text-sm font-medium mb-2">Loan Type *</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {['Home Loan', 'Car Loan', 'Personal Loan', 'Business Loan', 'Education Loan'].map((type) => (
            <label key={type} className="cursor-pointer">
              <input type="radio" value={type} className="sr-only" {...register('loanType', { required: 'Please select loan type' })} />
              <div
                className="p-3 rounded-xl text-center text-sm transition-all duration-200"
                style={{
                  background: loanType === type ? 'rgba(30,111,255,0.2)' : 'rgba(255,255,255,0.04)',
                  border: loanType === type ? '1px solid rgba(30,111,255,0.5)' : '1px solid rgba(255,255,255,0.10)',
                  color: loanType === type ? '#4D8FFF' : 'rgba(255,255,255,0.6)',
                }}
              >
                {type}
              </div>
            </label>
          ))}
        </div>
        {errors.loanType && <p className="text-red-400 text-xs mt-1">{errors.loanType.message}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">Loan Amount (₹) *</label>
          <input
            type="number"
            className="input-field"
            placeholder="5000000"
            {...register('loanAmount', {
              required: 'Loan amount is required',
              min: { value: 50000, message: 'Minimum loan amount is ₹50,000' },
              max: { value: 50000000, message: 'Maximum loan amount is ₹5 Crore' },
            })}
          />
          {errors.loanAmount && <p className="text-red-400 text-xs mt-1">{errors.loanAmount.message}</p>}
        </div>
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">Tenure (Years) *</label>
          <select
            className="input-field"
            {...register('tenure', { required: 'Please select tenure' })}
          >
            <option value="" style={{ background: '#0A1628' }}>Select tenure</option>
            {[1, 2, 3, 5, 7, 10, 15, 20, 25, 30].map((y) => (
              <option key={y} value={y} style={{ background: '#0A1628' }}>{y} {y === 1 ? 'Year' : 'Years'}</option>
            ))}
          </select>
          {errors.tenure && <p className="text-red-400 text-xs mt-1">{errors.tenure.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-white/60 text-sm font-medium mb-2">Purpose of Loan *</label>
        <textarea
          className="input-field resize-none"
          rows={3}
          placeholder="Briefly describe the purpose of your loan..."
          {...register('purpose', { required: 'Purpose is required', minLength: { value: 10, message: 'Please provide more details' } })}
        />
        {errors.purpose && <p className="text-red-400 text-xs mt-1">{errors.purpose.message}</p>}
      </div>

      <div>
        <label className="block text-white/60 text-sm font-medium mb-2">Residential Address *</label>
        <textarea
          className="input-field resize-none"
          rows={2}
          placeholder="Full address with PIN code"
          {...register('address', { required: 'Address is required' })}
        />
        {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address.message}</p>}
      </div>
    </div>
  )
}

// ── Step 3 ─────────────────────────────────────────────────────────────────
function StepFinancial({ register, errors, watch }) {
  const experience = watch('experience')
  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">Monthly Income (₹) *</label>
          <input
            type="number"
            className="input-field"
            placeholder="75000"
            {...register('monthlyIncome', {
              required: 'Monthly income is required',
              min: { value: 15000, message: 'Minimum income should be ₹15,000' },
            })}
          />
          {errors.monthlyIncome && <p className="text-red-400 text-xs mt-1">{errors.monthlyIncome.message}</p>}
        </div>
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">Existing EMI (₹/month)</label>
          <input
            type="number"
            className="input-field"
            placeholder="0 (if none)"
            defaultValue={0}
            {...register('existingEmi')}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">CIBIL Score *</label>
          <select
            className="input-field"
            {...register('cibilScore', { required: 'Please select CIBIL range' })}
          >
            <option value="" style={{ background: '#0A1628' }}>Select CIBIL range</option>
            <option value="750+" style={{ background: '#0A1628' }}>750+ (Excellent)</option>
            <option value="700-750" style={{ background: '#0A1628' }}>700–750 (Good)</option>
            <option value="650-700" style={{ background: '#0A1628' }}>650–700 (Fair)</option>
            <option value="600-650" style={{ background: '#0A1628' }}>600–650 (Average)</option>
            <option value="<600" style={{ background: '#0A1628' }}>Below 600</option>
            <option value="NA" style={{ background: '#0A1628' }}>No Credit History</option>
          </select>
          {errors.cibilScore && <p className="text-red-400 text-xs mt-1">{errors.cibilScore.message}</p>}
        </div>
        <div>
          <label className="block text-white/60 text-sm font-medium mb-2">Company / Employer Name *</label>
          <input
            className="input-field"
            placeholder="ABC Technologies Pvt Ltd"
            {...register('employer', { required: 'Employer name is required' })}
          />
          {errors.employer && <p className="text-red-400 text-xs mt-1">{errors.employer.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-white/60 text-sm font-medium mb-2">Work Experience *</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['< 1 Year', '1–3 Years', '3–5 Years', '5+ Years'].map((exp) => (
            <label key={exp} className="cursor-pointer">
              <input type="radio" value={exp} className="sr-only" {...register('experience', { required: true })} />
              <div
                className="p-3 rounded-xl text-center text-sm transition-all duration-200"
                style={{
                  background: experience === exp ? 'rgba(30,111,255,0.2)' : 'rgba(255,255,255,0.04)',
                  border: experience === exp ? '1px solid rgba(30,111,255,0.5)' : '1px solid rgba(255,255,255,0.10)',
                  color: experience === exp ? '#4D8FFF' : 'rgba(255,255,255,0.6)',
                }}
              >
                {exp}
              </div>
            </label>
          ))}
        </div>
        {errors.experience && <p className="text-red-400 text-xs mt-1">Please select experience</p>}
      </div>

      <div className="p-4 rounded-xl" style={{ background: 'rgba(30,111,255,0.08)', border: '1px solid rgba(30,111,255,0.20)' }}>
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="consent"
            className="mt-1"
            {...register('consent', { required: 'You must agree to proceed' })}
          />
          <label htmlFor="consent" className="text-white/60 text-sm leading-relaxed cursor-pointer">
            I authorise Khushal Finance to retrieve my credit information from credit bureaus and agree to the{' '}
            <span className="text-brand-blue">Terms & Conditions</span> and{' '}
            <span className="text-brand-blue">Privacy Policy</span>.
          </label>
        </div>
        {errors.consent && <p className="text-red-400 text-xs mt-1">{errors.consent.message}</p>}
      </div>
    </div>
  )
}

// ── Step 4 — Review ────────────────────────────────────────────────────────
function StepReview({ data }) {
  const sections = [
    {
      title: 'Personal Information',
      fields: [
        { label: 'Full Name', value: `${data.firstName || ''} ${data.lastName || ''}` },
        { label: 'Date of Birth', value: data.dob },
        { label: 'Gender', value: data.gender },
        { label: 'PAN', value: data.pan },
        { label: 'Mobile', value: data.mobile },
        { label: 'Email', value: data.email },
        { label: 'Employment', value: data.employmentType },
      ],
    },
    {
      title: 'Loan Details',
      fields: [
        { label: 'Loan Type', value: data.loanType },
        { label: 'Amount', value: data.loanAmount ? `₹${parseInt(data.loanAmount).toLocaleString('en-IN')}` : '' },
        { label: 'Tenure', value: data.tenure ? `${data.tenure} Years` : '' },
        { label: 'Purpose', value: data.purpose },
      ],
    },
    {
      title: 'Financial Information',
      fields: [
        { label: 'Monthly Income', value: data.monthlyIncome ? `₹${parseInt(data.monthlyIncome).toLocaleString('en-IN')}` : '' },
        { label: 'Existing EMI', value: data.existingEmi ? `₹${parseInt(data.existingEmi).toLocaleString('en-IN')}/mo` : '₹0/mo' },
        { label: 'CIBIL Score', value: data.cibilScore },
        { label: 'Employer', value: data.employer },
        { label: 'Experience', value: data.experience },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl flex items-start gap-3" style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.20)' }}>
        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
        <p className="text-emerald-300 text-sm">
          Please review your information carefully before submitting. You can go back to edit any section.
        </p>
      </div>

      {sections.map((section) => (
        <div key={section.title} className="glass-card p-5">
          <h4 className="text-white font-semibold mb-4 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            {section.title}
          </h4>
          <div className="grid md:grid-cols-2 gap-3">
            {section.fields.filter(f => f.value).map((field) => (
              <div key={field.label}>
                <p className="text-white/40 text-xs mb-0.5">{field.label}</p>
                <p className="text-white text-sm font-medium">{field.value}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Confirmation ────────────────────────────────────────────────────────────
function Confirmation({ refNumber, data }) {
  return (
    <div className="text-center py-8">
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ background: 'rgba(52,211,153,0.15)', border: '2px solid rgba(52,211,153,0.4)' }}
      >
        <CheckCircle className="w-12 h-12 text-emerald-400" />
      </div>

      <h2 className="text-3xl font-black text-white mb-3">Application Submitted!</h2>
      <p className="text-white/50 mb-8 max-w-md mx-auto">
        Thank you {data.firstName}! Your loan enquiry has been received. Our team will contact you within 24 hours.
      </p>

      <div className="glass-card p-6 max-w-sm mx-auto mb-8">
        <p className="text-white/40 text-sm mb-1">Reference Number</p>
        <p className="text-2xl font-black text-brand-blue tracking-widest">{refNumber}</p>
        <p className="text-white/30 text-xs mt-2">Save this for future reference</p>
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-8">
        {[
          { label: 'Loan Type', value: data.loanType?.split(' ')[0] },
          { label: 'Amount', value: data.loanAmount ? `₹${(parseInt(data.loanAmount)/100000).toFixed(0)}L` : '' },
          { label: 'Status', value: 'Under Review' },
        ].map((s) => (
          <div key={s.label} className="glass-card p-3 text-center">
            <p className="text-white font-semibold text-sm">{s.value}</p>
            <p className="text-white/30 text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      <a href="/" className="btn-primary px-8 py-3">
        Back to Home
      </a>
    </div>
  )
}

// ── Main Form ───────────────────────────────────────────────────────────────
export default function EnquiryPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [refNumber] = useState(generateRefNumber)

  const { register, handleSubmit, watch, trigger, getValues, formState: { errors } } = useForm({ mode: 'onBlur' })

  const stepFields = {
    1: ['firstName', 'lastName', 'dob', 'gender', 'pan', 'mobile', 'email', 'employmentType'],
    2: ['loanType', 'loanAmount', 'tenure', 'purpose', 'address'],
    3: ['monthlyIncome', 'cibilScore', 'employer', 'experience', 'consent'],
  }

  const nextStep = async () => {
    const valid = await trigger(stepFields[currentStep])
    if (valid) setCurrentStep((s) => Math.min(s + 1, 4))
  }

  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1))

  const onSubmit = (data) => setSubmitted(true)

  if (submitted) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <Confirmation refNumber={refNumber} data={getValues()} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div
        className="py-12 px-4 md:px-8 text-center relative"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(30,111,255,0.12) 0%, transparent 60%)' }}
      >
        <div className="section-tag mx-auto">Loan Application</div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
          Apply for a <span className="gradient-text">Loan</span>
        </h1>
        <p className="text-white/50">Complete the form below — takes only 5 minutes</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 pb-20">
        {/* Step Progress */}
        <div className="flex items-center justify-between mb-10 relative">
          <div
            className="absolute top-5 left-0 right-0 h-0.5 -z-10"
            style={{ background: 'rgba(255,255,255,0.10)' }}
          />
          <div
            className="absolute top-5 left-0 h-0.5 -z-10 transition-all duration-500"
            style={{
              background: 'linear-gradient(90deg, #1E6FFF, #4D8FFF)',
              width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
            }}
          />
          {STEPS.map((step) => {
            const Icon = step.icon
            const isDone = currentStep > step.id
            const isActive = currentStep === step.id
            return (
              <div key={step.id} className="flex flex-col items-center gap-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300"
                  style={{
                    background: isDone ? 'linear-gradient(135deg, #34D399, #059669)' : isActive ? 'linear-gradient(135deg, #1E6FFF, #0A52CC)' : 'rgba(255,255,255,0.08)',
                    border: isActive ? '2px solid #4D8FFF' : 'none',
                    color: isDone || isActive ? 'white' : 'rgba(255,255,255,0.30)',
                    boxShadow: isActive ? '0 0 20px rgba(30,111,255,0.4)' : 'none',
                  }}
                >
                  {isDone ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                </div>
                <span
                  className="text-xs font-medium hidden sm:block"
                  style={{ color: isActive ? 'white' : isDone ? '#34D399' : 'rgba(255,255,255,0.30)' }}
                >
                  {step.title}
                </span>
              </div>
            )
          })}
        </div>

        {/* Form card */}
        <div className="glass-card p-8">
          <h2 className="text-xl font-bold text-white mb-6">
            Step {currentStep}: {STEPS[currentStep - 1].title}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {currentStep === 1 && <StepPersonal register={register} errors={errors} watch={watch} />}
            {currentStep === 2 && <StepLoanDetails register={register} errors={errors} watch={watch} />}
            {currentStep === 3 && <StepFinancial register={register} errors={errors} watch={watch} />}
            {currentStep === 4 && <StepReview data={getValues()} />}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="btn-secondary flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>

              {currentStep < 4 ? (
                <button type="button" onClick={nextStep} className="btn-primary flex items-center gap-2">
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button type="submit" className="btn-gold flex items-center gap-2 px-8">
                  Submit Application <CheckCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
