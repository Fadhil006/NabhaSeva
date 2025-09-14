# NabhaSeva Healthcare Platform Design Guidelines

## Design Approach
**Reference-Based Approach**: Healthcare platforms require trust, accessibility, and efficiency. Drawing inspiration from established healthcare platforms like Epic MyChart and Zocdoc, combined with government portal aesthetics for rural Indian context.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Brand Blue: 210 85% 45% (medical trust and reliability)
- Success Green: 142 71% 45% (health and wellness)
- Warning Amber: 38 92% 50% (alerts and notifications)
- Error Red: 0 84% 60% (critical alerts)

**Dark Mode:**
- Background: 222 84% 5%
- Surface: 215 28% 17%
- Text Primary: 210 20% 98%
- Text Secondary: 215 16% 65%

**Light Mode:**
- Background: 0 0% 100%
- Surface: 210 20% 98%
- Text Primary: 222 84% 5%
- Text Secondary: 215 16% 45%

### B. Typography
- **Primary Font**: Inter (Google Fonts) - excellent readability for medical data
- **Secondary Font**: Noto Sans Devanagari (for Hindi support)
- **Sizes**: Text-sm (14px) for body, text-base (16px) for forms, text-lg+ for headings
- **Weights**: Regular (400), Medium (500), Semibold (600)

### C. Layout System
**Spacing Primitives**: Tailwind units of 2, 4, 6, and 8
- Micro spacing: p-2, m-2 (8px)
- Standard spacing: p-4, m-4 (16px) 
- Section spacing: p-6, m-6 (24px)
- Large spacing: p-8, m-8 (32px)

### D. Component Library
**Navigation**:
- Multi-role sidebar with clear role indicators
- Breadcrumb navigation for complex workflows
- Sticky headers for long forms

**Forms**:
- Large touch targets for mobile accessibility
- Clear field labels and validation states
- Progress indicators for multi-step processes
- Accessible date/time pickers for appointments

**Data Displays**:
- Clean tables with zebra striping
- Card-based layouts for patient/doctor profiles
- Status badges with semantic colors
- Medical record viewers with clear hierarchy

**Trust Elements**:
- Security badges and certifications
- Clear privacy notices
- Professional photography placeholders
- Government compliance indicators

### E. Accessibility Focus
- High contrast ratios (minimum 4.5:1)
- Large clickable areas (minimum 44px)
- Keyboard navigation support
- Screen reader optimization
- Multi-language toggle (Hindi/English)

## Key Design Principles
1. **Trust First**: Medical platforms require immediate credibility through clean, professional design
2. **Rural Accessibility**: Large fonts, simple navigation, offline-friendly indicators
3. **Role Clarity**: Clear visual distinction between Admin, Doctor, and Patient interfaces
4. **Data Privacy**: Visible security indicators and consent flows
5. **Mobile Priority**: Touch-friendly interfaces for smartphone users

## Images
- **Hero Image**: Professional Indian healthcare workers in rural setting (warm, trustworthy)
- **Feature Icons**: Medical iconography using Heroicons medical subset
- **Profile Placeholders**: Diverse Indian healthcare professionals and patients
- **Facility Images**: Clean, modern rural healthcare facilities

The design emphasizes trust, accessibility, and clear information hierarchy essential for healthcare applications serving rural communities.