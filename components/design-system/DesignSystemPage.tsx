"use client";

import React, { useState } from "react";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Textarea,
  Select,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Modal,
  Tooltip,
  Breadcrumb,
  Pagination,
  Skeleton,
  Divider,
  IconBox,
  Avatar,
  SmartLink,
} from "@/components/ui";
import {
  Container,
  Section,
  SectionHeader,
  PageHero,
} from "@/components/layout";
import {
  GraduationCap,
  BookOpen,
  Award,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Palette,
  Type,
  Layout,
  Component,
  Info,
} from "lucide-react";

/**
 * Dev-only Design System & Component Catalog page.
 * Displays all color tokens, typography scales, UI primitives,
 * layout components, and section variants.
 */
export function DesignSystemPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(2);

  const brandColors = [
    { name: "brand-950", hex: "#071f14", text: "text-white" },
    { name: "brand-900", hex: "#0f3d2b", text: "text-white" },
    { name: "brand-800", hex: "#14513a", text: "text-white" },
    { name: "brand-700", hex: "#1a6a4a", text: "text-white" },
    { name: "brand-600", hex: "#218a5e", text: "text-white" },
    { name: "brand-500", hex: "#2bab74", text: "text-ink-900" },
    { name: "brand-200", hex: "#a8d8be", text: "text-ink-900" },
    { name: "brand-100", hex: "#e4efe7", text: "text-ink-900" },
    { name: "brand-50", hex: "#f2f7f3", text: "text-ink-900" },
  ];

  const accentColors = [
    { name: "accent-700", hex: "#8a6420", text: "text-white" },
    { name: "accent-600", hex: "#b98a2e", text: "text-white" },
    { name: "accent-500", hex: "#c9a24b", text: "text-ink-900" },
    { name: "accent-400", hex: "#d9bb72", text: "text-ink-900" },
    { name: "accent-100", hex: "#f6ebd0", text: "text-ink-900" },
    { name: "accent-50", hex: "#fdf7ec", text: "text-ink-900" },
  ];

  const inkColors = [
    { name: "ink-900", hex: "#14201a", text: "text-white" },
    { name: "ink-700", hex: "#2a3a30", text: "text-white" },
    { name: "ink-600", hex: "#4a5a52", text: "text-white" },
    { name: "ink-400", hex: "#8a9a92", text: "text-ink-900" },
    { name: "ink-200", hex: "#c8d4cc", text: "text-ink-900" },
  ];

  const surfaceColors = [
    { name: "surface", hex: "#ffffff", text: "text-ink-900", border: true },
    { name: "canvas", hex: "#faf8f3", text: "text-ink-900", border: true },
    { name: "border", hex: "#e3e8e4", text: "text-ink-900", border: true },
    { name: "border-strong", hex: "#c2ccc5", text: "text-ink-900" },
  ];

  return (
    <div className="bg-canvas min-h-screen pb-24">
      {/* Dev Header */}
      <div className="sticky top-0 z-sticky bg-brand-950 text-white border-b border-brand-900/60 shadow-md backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Layers className="h-6 w-6 text-accent-400" />
            <div>
              <span className="font-heading font-bold tracking-tight text-white sm:text-h4">
                MGMCET Design System
              </span>
              <Badge variant="accent" size="sm" className="ml-3 font-semibold">
                Dev Only
              </Badge>
            </div>
          </div>
          <nav className="flex items-center gap-2 sm:gap-4 text-body-sm font-medium">
            <a
              href="#tokens"
              className="px-2.5 py-1 rounded-md text-brand-100 hover:text-white hover:bg-white/10 transition-colors"
            >
              Tokens
            </a>
            <a
              href="#typography"
              className="px-2.5 py-1 rounded-md text-brand-100 hover:text-white hover:bg-white/10 transition-colors"
            >
              Typography
            </a>
            <a
              href="#primitives"
              className="px-2.5 py-1 rounded-md text-brand-100 hover:text-white hover:bg-white/10 transition-colors"
            >
              UI Primitives
            </a>
            <a
              href="#layout"
              className="px-2.5 py-1 rounded-md text-brand-100 hover:text-white hover:bg-white/10 transition-colors"
            >
              Layout Primitives
            </a>
            <a
              href="#hero-preview"
              className="px-2.5 py-1 rounded-md text-brand-100 hover:text-white hover:bg-white/10 transition-colors"
            >
              Hero Preview
            </a>
          </nav>
        </div>
      </div>

      <Container className="pt-10 space-y-16">
        {/* Intro Card */}
        <Card variant="tinted">
          <CardHeader>
            <div className="flex items-center gap-2 text-brand-800">
              <Info className="h-5 w-5" />
              <CardTitle>Design System Specification & Visual Catalog</CardTitle>
            </div>
            <CardDescription>
              This catalog contains live renderings of every UI primitive, layout container,
              typography scale, and color token defined in <code>app/globals.css</code>. It is
              dynamically excluded from production builds when{" "}
              <code>NEXT_PUBLIC_SHOW_DESIGN_SYSTEM</code> is omitted.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* 1. COLOR TOKENS */}
        <section id="tokens" className="scroll-mt-24 space-y-8">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Palette className="h-6 w-6 text-brand-700" />
            <h2 className="text-h2 font-heading font-bold text-ink-900">
              1. Color Tokens (@theme)
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-h4 font-heading font-semibold text-ink-700 mb-3">
                Brand Palette (Primary Deep Greens)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
                {brandColors.map((c) => (
                  <div
                    key={c.name}
                    className="p-3 rounded-lg shadow-xs flex flex-col justify-between h-24"
                    style={{ backgroundColor: c.hex }}
                  >
                    <span className={`text-xs font-mono font-bold ${c.text}`}>{c.name}</span>
                    <span className={`text-xs font-mono opacity-80 ${c.text}`}>{c.hex}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-h4 font-heading font-semibold text-ink-700 mb-3">
                Accent Palette (Warm Kerala Gold)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {accentColors.map((c) => (
                  <div
                    key={c.name}
                    className="p-3 rounded-lg shadow-xs flex flex-col justify-between h-24"
                    style={{ backgroundColor: c.hex }}
                  >
                    <span className={`text-xs font-mono font-bold ${c.text}`}>{c.name}</span>
                    <span className={`text-xs font-mono opacity-80 ${c.text}`}>{c.hex}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-h4 font-heading font-semibold text-ink-700 mb-3">
                  Ink (High Contrast Text)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {inkColors.map((c) => (
                    <div
                      key={c.name}
                      className="p-3 rounded-lg shadow-xs flex flex-col justify-between h-24"
                      style={{ backgroundColor: c.hex }}
                    >
                      <span className={`text-xs font-mono font-bold ${c.text}`}>{c.name}</span>
                      <span className={`text-xs font-mono opacity-80 ${c.text}`}>{c.hex}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-h4 font-heading font-semibold text-ink-700 mb-3">
                  Surface & Canvas
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {surfaceColors.map((c) => (
                    <div
                      key={c.name}
                      className={`p-3 rounded-lg shadow-xs flex flex-col justify-between h-24 ${
                        c.border ? "border border-border" : ""
                      }`}
                      style={{ backgroundColor: c.hex }}
                    >
                      <span className={`text-xs font-mono font-bold ${c.text}`}>{c.name}</span>
                      <span className={`text-xs font-mono opacity-80 ${c.text}`}>{c.hex}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. TYPOGRAPHY */}
        <section id="typography" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Type className="h-6 w-6 text-brand-700" />
            <h2 className="text-h2 font-heading font-bold text-ink-900">
              2. Typography Scale
            </h2>
          </div>

          <Card className="divide-y divide-border">
            <div className="p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <span className="font-mono text-caption text-ink-400 w-36 shrink-0">
                text-display
              </span>
              <p className="text-display font-heading font-bold text-ink-900 leading-tight">
                Shaping Engineers, Inspiring Innovators
              </p>
            </div>
            <div className="p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <span className="font-mono text-caption text-ink-400 w-36 shrink-0">
                text-h1
              </span>
              <p className="text-h1 font-heading font-bold text-ink-900 leading-tight">
                Academic Excellence & Research
              </p>
            </div>
            <div className="p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <span className="font-mono text-caption text-ink-400 w-36 shrink-0">
                text-h2
              </span>
              <p className="text-h2 font-heading font-semibold text-ink-900 leading-tight">
                Undergraduate & Postgraduate Programs
              </p>
            </div>
            <div className="p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <span className="font-mono text-caption text-ink-400 w-36 shrink-0">
                text-h3
              </span>
              <p className="text-h3 font-heading font-semibold text-ink-900">
                Department of Computer Science & Engineering
              </p>
            </div>
            <div className="p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <span className="font-mono text-caption text-ink-400 w-36 shrink-0">
                text-h4
              </span>
              <p className="text-h4 font-heading font-semibold text-ink-900">
                Laboratory Facilities & Research Centers
              </p>
            </div>
            <div className="p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <span className="font-mono text-caption text-ink-400 w-36 shrink-0">
                text-eyebrow
              </span>
              <p className="text-eyebrow font-heading font-bold uppercase tracking-wider text-brand-700">
                ADMISSIONS 2026–27 NOW OPEN
              </p>
            </div>
            <div className="p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <span className="font-mono text-caption text-ink-400 w-36 shrink-0">
                font-script
              </span>
              <p className="font-script text-h1 text-accent-600">
                Excellence in Engineering Education
              </p>
            </div>
            <div className="p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <span className="font-mono text-caption text-ink-400 w-36 shrink-0">
                text-body-lg
              </span>
              <p className="text-body-lg text-ink-700 leading-relaxed max-w-2xl">
                MGMCET was established in 1994 with an aim to provide technical education to all
                sections of society with world-class faculty and laboratories.
              </p>
            </div>
            <div className="p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <span className="font-mono text-caption text-ink-400 w-36 shrink-0">
                text-body
              </span>
              <p className="text-body text-ink-700 leading-relaxed max-w-2xl">
                Standard body paragraph text designed for readability across mobile devices and desktop
                displays with balanced leading and contrast.
              </p>
            </div>
            <div className="p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <span className="font-mono text-caption text-ink-400 w-36 shrink-0">
                text-body-sm
              </span>
              <p className="text-body-sm text-ink-600 max-w-2xl">
                Secondary metadata, auxiliary descriptions, timestamps, and card subtitles.
              </p>
            </div>
            <div className="p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <span className="font-mono text-caption text-ink-400 w-36 shrink-0">
                text-caption
              </span>
              <p className="text-caption text-ink-400">
                Fine print, footnotes, breadcrumbs, copyright text, and legal disclosures.
              </p>
            </div>
          </Card>
        </section>

        {/* 3. UI PRIMITIVES */}
        <section id="primitives" className="scroll-mt-24 space-y-10">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Component className="h-6 w-6 text-brand-700" />
            <h2 className="text-h2 font-heading font-bold text-ink-900">
              3. UI Primitives
            </h2>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <h3 className="text-h3 font-heading font-semibold text-ink-800">Button Component</h3>
            <Card className="p-6 space-y-6">
              <div>
                <p className="text-caption font-mono text-ink-400 uppercase tracking-wider mb-3">
                  Variants
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="accent">Accent (Gold)</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link Button</Button>
                  <Button variant="dark">Dark</Button>
                </div>
              </div>

              <div className="bg-brand-900 p-4 rounded-lg">
                <p className="text-caption font-mono text-brand-200 uppercase tracking-wider mb-3">
                  Outline Light (Dark Background)
                </p>
                <div className="flex items-center gap-3">
                  <Button variant="outline-light">Outline Light</Button>
                  <Button variant="accent" pill>
                    Accent Pill
                  </Button>
                </div>
              </div>

              <div>
                <p className="text-caption font-mono text-ink-400 uppercase tracking-wider mb-3">
                  Sizes & Shapes
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium (Default)</Button>
                  <Button size="lg">Large</Button>
                  <Button pill variant="primary">
                    Pill Shape
                  </Button>
                  <Button
                    variant="primary"
                    leftIcon={<BookOpen className="h-4 w-4" />}
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    With Icons
                  </Button>
                  <Button isLoading variant="primary">
                    Loading
                  </Button>
                  <Button disabled variant="primary">
                    Disabled
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Badges */}
          <div className="space-y-4">
            <h3 className="text-h3 font-heading font-semibold text-ink-800">Badge Component</h3>
            <Card className="p-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="brand">Brand</Badge>
                <Badge variant="accent">Accent (Gold)</Badge>
                <Badge variant="mint">Mint</Badge>
                <Badge variant="dark">Dark</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="surface">Surface</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="accent" size="sm">
                  Small Accent
                </Badge>
              </div>
            </Card>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            <h3 className="text-h3 font-heading font-semibold text-ink-800">Card Variants</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>Outlined Variant</CardTitle>
                  <CardDescription>White background with subtle border.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-body-sm text-ink-600">Standard card used across department and news grids.</p>
                </CardContent>
                <CardFooter>
                  <Badge variant="outline">Footer action</Badge>
                </CardFooter>
              </Card>

              <Card variant="tinted">
                <CardHeader>
                  <CardTitle>Tinted Variant</CardTitle>
                  <CardDescription>Soft brand-50 mint tint with border.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-body-sm text-ink-600">Great for highlight callouts and secondary cards.</p>
                </CardContent>
                <CardFooter>
                  <Badge variant="brand">Active</Badge>
                </CardFooter>
              </Card>

              <Card variant="accent">
                <CardHeader>
                  <CardTitle>Accent Variant</CardTitle>
                  <CardDescription>Warm parchment gold neutral background.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-body-sm text-ink-600">Used for institutional quotes and vision blocks.</p>
                </CardContent>
                <CardFooter>
                  <Badge variant="accent">Institutional</Badge>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="space-y-4">
            <h3 className="text-h3 font-heading font-semibold text-ink-800">Form Controls</h3>
            <Card className="p-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Input label="Full Name" placeholder="e.g. Adarsh Sharma" helperText="Enter as per records" />
                <Input
                  label="Email Address"
                  defaultValue="invalid-email"
                  error="Please enter a valid academic email address"
                />
                <Input label="Disabled Field" disabled value="Fixed ID: KTU-2026-09" />
                <Select
                  label="Select Program"
                  options={[
                    { value: "btech-aiml", label: "B.Tech AI & ML" },
                    { value: "btech-cse", label: "B.Tech CSE" },
                    { value: "poly-civil", label: "Polytechnic Civil" },
                  ]}
                  defaultValue="btech-aiml"
                />
                <div className="sm:col-span-2">
                  <Textarea label="Admission Enquiry Note" placeholder="Write any specific query regarding hostel or bus routes..." rows={3} />
                </div>
              </div>
            </Card>
          </div>

          {/* Interactive Primitives: Tabs, Accordion, Modal, Tooltip */}
          <div className="space-y-4">
            <h3 className="text-h3 font-heading font-semibold text-ink-800">Interactive Components</h3>
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Tabs */}
              <Card className="p-6">
                <h4 className="text-h4 font-heading font-semibold text-ink-800 mb-4">Tabs</h4>
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
                    <TabsTrigger value="faculty">Faculty</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <p className="text-body text-ink-600">
                      The Department offers state-of-the-art curricula aligned with APJ Abdul Kalam
                      Technological University (KTU).
                    </p>
                  </TabsContent>
                  <TabsContent value="syllabus">
                    <p className="text-body text-ink-600">
                      8 Semesters comprising foundational mathematics, computing cores, and emerging tech electives.
                    </p>
                  </TabsContent>
                  <TabsContent value="faculty">
                    <p className="text-body text-ink-600">
                      14 full-time faculty members with M.Tech and Ph.D qualifications.
                    </p>
                  </TabsContent>
                </Tabs>
              </Card>

              {/* Accordion */}
              <Card className="p-6">
                <h4 className="text-h4 font-heading font-semibold text-ink-800 mb-4">Accordion</h4>
                <Accordion type="single" defaultValue="faq-1">
                  <AccordionItem value="faq-1">
                    <AccordionTrigger>What is the eligibility for B.Tech admission?</AccordionTrigger>
                    <AccordionContent>
                      Candidates must have passed 10+2 examination with Physics and Mathematics as compulsory subjects
                      with a minimum of 45% marks and qualified in KEAM.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-2">
                    <AccordionTrigger>Is hostel accommodation available for students?</AccordionTrigger>
                    <AccordionContent>
                      Yes, secure, Wi-Fi enabled on-campus residential facilities are available for both male and female
                      students with hygienic mess and 24/7 security.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            </div>
          </div>

          {/* Modal & Tooltips */}
          <Card className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <h4 className="text-h4 font-heading font-semibold text-ink-800 mb-1">
                  Modal & Tooltip Dialogs
                </h4>
                <p className="text-body-sm text-ink-600">
                  Accessible keyboard-trapped dialogs and accessible hover tooltips.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Tooltip content="Launches a test accessible modal dialog" position="top">
                  <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                    Open Demo Modal
                  </Button>
                </Tooltip>
              </div>
            </div>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="MGMCET Component Modal"
              description="This is an accessible dialog demonstrating body scroll locking and Escape key handling."
            >
              <div className="space-y-4 pt-2">
                <p className="text-body text-ink-700">
                  Modals are built with ARIA dialog roles, focus management, backdrop blur, and smooth exit handling.
                </p>
                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                    Acknowledge
                  </Button>
                </div>
              </div>
            </Modal>
          </Card>

          {/* Pagination & Breadcrumb */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 space-y-4">
              <h4 className="text-h4 font-heading font-semibold text-ink-800">Breadcrumb</h4>
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Departments", href: "/departments" },
                  { label: "B.Tech Computer Science", current: true },
                ]}
              />
            </Card>

            <Card className="p-6 space-y-4">
              <h4 className="text-h4 font-heading font-semibold text-ink-800">Pagination</h4>
              <Pagination
                currentPage={currentPage}
                totalPages={6}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </Card>
          </div>

          {/* IconBox & Avatars */}
          <Card className="p-6 space-y-6">
            <div>
              <h4 className="text-h4 font-heading font-semibold text-ink-800 mb-4">
                IconBox Variants & Shapes
              </h4>
              <div className="flex flex-wrap items-center gap-4">
                <IconBox variant="brand" icon={<GraduationCap />} />
                <IconBox variant="accent" icon={<Sparkles />} />
                <IconBox variant="mint" icon={<BookOpen />} />
                <IconBox variant="gold" icon={<Award />} />
                <IconBox variant="dark" icon={<ShieldCheck />} />
                <IconBox variant="surface" icon={<CheckCircle2 />} />
                <IconBox variant="brand" size="lg" shape="circle" icon={<GraduationCap />} />
              </div>
            </div>

            <Divider />

            <div>
              <h4 className="text-h4 font-heading font-semibold text-ink-800 mb-4">
                Avatar Sizes & Fallbacks
              </h4>
              <div className="flex flex-wrap items-center gap-4">
                <Avatar name="Dr. Geetha K" size="sm" />
                <Avatar name="Prof. Arun Kumar" size="md" />
                <Avatar name="Dr. Manoj Nair" size="lg" />
                <Avatar name="Principal Officer" size="xl" />
              </div>
            </div>

            <Divider />

            <div>
              <h4 className="text-h4 font-heading font-semibold text-ink-800 mb-4">
                SmartLink Component
              </h4>
              <div className="flex flex-wrap items-center gap-6">
                <SmartLink href="/about" className="font-medium text-brand-700 hover:underline">
                  Internal Route Link
                </SmartLink>
                <SmartLink
                  href="https://ktu.edu.in"
                  showIcon
                  className="font-medium text-brand-700 hover:underline inline-flex items-center gap-1"
                >
                  External University Portal
                </SmartLink>
                <SmartLink
                  href="/documents/nirf-2026.pdf"
                  isPdf
                  showIcon
                  className="font-medium text-accent-700 hover:underline inline-flex items-center gap-1"
                >
                  Download NIRF Report (PDF)
                </SmartLink>
              </div>
            </div>

            <Divider />

            <div>
              <h4 className="text-h4 font-heading font-semibold text-ink-800 mb-4">
                Skeleton Loading States
              </h4>
              <div className="space-y-3 max-w-md">
                <Skeleton variant="text" className="w-3/4" />
                <Skeleton variant="text" className="w-full" />
                <Skeleton variant="rectangular" className="h-20 w-full" />
              </div>
            </div>
          </Card>
        </section>

        {/* 4. LAYOUT PRIMITIVES */}
        <section id="layout" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Layout className="h-6 w-6 text-brand-700" />
            <h2 className="text-h2 font-heading font-bold text-ink-900">
              4. Layout Primitives
            </h2>
          </div>

          <div className="space-y-6">
            <Section tone="mint" className="rounded-xl border border-border shadow-xs">
              <SectionHeader
                eyebrow="Section Primitive Preview"
                title="Tone: Mint Section"
                description="The Section primitive standardizes vertical padding, accessible semantic tags, and tone-specific styling."
                action={
                  <Button variant="primary" size="sm">
                    Action Button
                  </Button>
                }
              />
            </Section>

            <Section tone="dark" className="rounded-xl border border-brand-900 shadow-xs">
              <SectionHeader
                eyebrow="Dark Tone Preview"
                title="Tone: Dark Section"
                description="High-contrast dark green section used for CTA banners and footer regions."
                action={
                  <Button variant="accent" size="sm">
                    Inquire Now
                  </Button>
                }
              />
            </Section>
          </div>
        </section>

        {/* 5. HERO PREVIEW */}
        <section id="hero-preview" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <GraduationCap className="h-6 w-6 text-brand-700" />
            <h2 className="text-h2 font-heading font-bold text-ink-900">
              5. PageHero Layout Preview
            </h2>
          </div>

          <div className="rounded-2xl overflow-hidden border border-border shadow-md">
            <PageHero
              badge="Department of Engineering"
              title="Artificial Intelligence & Machine Learning"
              description="A 4-year premier undergraduate engineering program approved by AICTE and affiliated to APJ Abdul Kalam Technological University."
              breadcrumbItems={[
                { label: "Home", href: "/" },
                { label: "Departments", href: "/departments" },
                { label: "B.Tech AI & ML", current: true },
              ]}
              image="https://ik.imagekit.io/miwqceyia/mgmcet/images/departments/btech-aiml.webp"
            />
          </div>
        </section>
      </Container>
    </div>
  );
}
