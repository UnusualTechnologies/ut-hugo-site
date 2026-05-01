---
title: "Breez Dental"
type: "projects"
project_type: "Client"
tags:
  - "ai"
  - "health"
  - "windows"
prominence: 40
featured_image: "/images/projects/breez-dental.png"
banner_image: "/images/projects/banners/breez-dental.webp"

overview: "Bosco Dental Studio, an innovator in dental practice solutions, hired us to develop an AI-powered note-taking service. The objective was to significantly reduce the time dentists spend on admin tasks, allowing for a greater focus on patient care."

technologies: ["AI", "Speech to text", "Native", ".Net", "PHP"]

client:
  name: "Bosco Dental Studio"
  website: "https://www.breez-dental.com/"

overview_video_id: "9dfGM5TgH0g"

testimonial:
  quote: "After Unusual Technology implemented our software here, it helped us remove 20% of all the errors and streamline the whole process."
  full_text: |
    Hi, I'm Agnieszka. And this is Bernard. And we're both owners of Bosco Dental Studio, which is a dental practice here in Scotland.

    The great thing about Unusual Technology is that they helped us create a new software to streamline how the reception works and to remove all the inefficiency within the dental clinic. After Unusual Technology implemented our software here, it helped us remove 20% of all the errors and streamline the whole process.

    We really loved how Unusual Technology has been very approachable in helping us complete the project. They were bouncing ideas back and forth, asking us for our opinion about design features as well as functionality of the product. They ensured that we were really happy before finally completing the project. And communication with them was very easy throughout.
  person_name: "Agnieszka & Bernard"
  person_title: "Owners"
  person_org: "Bosco Dental Studio"
  video_id: "KnDEyLdO9lk"
---

![Breez is a subscription-based SaaS](/images/projects/Screenshot-2025-05-28-143229.png)

![](/images/projects/Screenshot-2025-11-12-145319-768x793.png)

![Dental notes and recordings are stored securely](/images/projects/Screenshot-2025-11-12-152814-768x546.png)

![](/images/projects/Screenshot-2025-11-12-145448-768x789.png)

![Navigation widget](/images/projects/Screenshot-2025-11-12-150322.png)

## Write-Up & Learnings

Building Secure & Compliant Medical Apps: Our Expertise in HealthTech

Developing applications for the medical and healthcare space requires more than just technical skill; it demands a deep understanding of data security and regulatory compliance. Handling sensitive patient data is a core responsibility, and we architect our platforms with security as the first priority.

Our work on the Bosco Dental Studio AI platform serves as a prime example. We developed an innovative SaaS solution to automate clinical note-taking for dentists, a role that processes highly sensitive patient information.

From the ground up, the system was engineered for high-level security to ensure all patient notes and audio recordings are safely processed and stored. Our development process strictly adheres to all relevant data protection guidelines, including GDC and GDPR. We even manage secure deployment, delivering the cross-platform application as a fully EV-signed and secure MSI installer, which ensures a professional and trustworthy deployment suitable for clinical environments.

This project demonstrates our proven capability to develop complex, AI-integrated applications for specialised, regulated industries.

### Smart AI Integration: Building Robust Platforms with Multi-Model Fallbacks

The AI landscape is evolving rapidly. Relying on a single AI provider for a core business function is a significant risk. We design our AI products to be "future-proof" by building a modular, flexible architecture.

In our R&D project for Bosco Dental Studio, we specifically designed the server architecture to be modular. This design is crucial because it allows the platform to readily integrate, evaluate, and switch between different AI transcription and NLP services.

This multi-model strategy is essential for both performance and cost-effectiveness. For a complex, dual-function service like Bosco's, this architecture allows us to:

- For Speech-to-Text: Integrate and benchmark multiple services like FalAI (Wizper), AssemblyAI, and Deepgram to find the optimal balance of speed, accuracy, and cost for a clinical environment.
- For Note Generation: Test and deploy various large language models like OpenAI, Claude, or Gemini (while navigating potential use-case restrictions, such as those related to medical use).

This approach ensures our clients can consistently leverage the best-performing and most cost-effective technologies without re-engineering the core product.

### From Uncertainty to Innovation: Our R&D Process for Custom AI Solutions

Many groundbreaking projects begin with significant technological uncertainties. Our team excels at navigating these challenges through a systematic R&D process, turning uncertain concepts into market-leading products.

Our project to create an AI-powered note-taking platform for Bosco Dental Studio highlights this process. The initial challenge was clear: generic, off-the-shelf transcription tools were technologically unsuitable for a noisy clinical setting with multiple speakers.

We identified two core technological uncertainties and resolved them systematically:

- The Speaker Challenge: It was uncertain if a dual-microphone system could reliably differentiate a dentist's voice from a patient's in a live clinic. Our Process: We conducted a controlled trial with 3 practitioners and ~50 patients. By systematically analysing this real-world data, we proved our dual-channel approach was technologically viable and provided a significant improvement.
- The Speed Challenge: It was uncertain if we could process audio in real-time using a new custom algorithm without losing the accuracy needed for clinical notes. Our Process: We used an iterative development process, testing algorithm iterations in the lab before deploying the best options in a two-week field test to find the optimal balance for real-world performance.

This R&D methodology successfully resolved fundamental technological uncertainties and created a secure, high-performance service that exceeded the initial MVP, leading to further client funding and platform expansion.
