import type { LibraryResource } from '../lib/types';

export const LIBRARY_RESOURCES: LibraryResource[] = [
  {
    id: 'glossary-core',
    title: 'Core security glossary',
    category: 'Glossary',
    type: '20 terms',
    readTime: 8,
    summary:
      'The vocabulary you need to read security advisories, incident reports and architecture documents without guessing.',
    tags: ['fundamentals', 'reference'],
    sections: [
      {
        title: 'Threats and defenses',
        paragraphs: [
          'Threat: a potential cause of harm. Vulnerability: a weakness that a threat can exploit. Risk: the combination of likelihood and impact. Control: a safeguard that reduces risk. Exploit: a technique or code that takes advantage of a vulnerability. These words are often used interchangeably in casual conversation, but precision helps when you are prioritizing work.',
          'Attack surface: everything an attacker can interact with — interfaces, accounts, services, people and supply chains. Least privilege: granting only the access required for a task. Defense in depth: multiple independent controls so one failure does not become a breach. Assume breach: designing as if an attacker is already inside.',
        ],
      },
      {
        title: 'Identity and cryptography',
        paragraphs: [
          'Authentication proves identity; authorization decides what an identity may do. MFA combines different factor categories. A passkey is a phishing-resistant credential based on public-key cryptography. Session fixation is an attack where a pre-login session identifier is reused after login.',
          'Encryption is reversible with a key. Hashing is one-way. A salt is unique random data added before hashing. A digital signature proves integrity and origin using a private key. A certificate binds a public key to an identity, usually a domain name, through a chain of trust.',
        ],
      },
      {
        title: 'Incident language',
        paragraphs: [
          'Indicator of compromise (IOC): observable evidence such as a malicious domain, file hash or IP. Telemetry: data collected for monitoring. False positive: an alert that does not represent real malicious activity. Containment: stopping spread. Eradication: removing the cause. Recovery: restoring normal service. Post-incident review: learning without assigning blame.',
          'Use these terms as handles for complex situations. They are not a substitute for evidence, but they make collaboration possible under pressure.',
        ],
      },
    ],
  },
  {
    id: 'ports-cheatsheet',
    title: 'Common ports & protocols cheat sheet',
    category: 'Cheat Sheet',
    type: 'Quick reference',
    readTime: 4,
    summary:
      'A compact reference for the ports you will meet in networking and security work — and the security questions to ask about each.',
    tags: ['networking', 'reference', 'ports'],
    sections: [
      {
        title: 'Well-known services',
        paragraphs: [
          'Ports identify services on a host. The number is a convention, not a guarantee: a service can listen on any port. Security work is about what is actually exposed and how it is protected, not just the number.',
        ],
        bullets: [
          '22 — SSH, encrypted remote shell. Restrict sources, disable password auth, use keys.',
          '25 / 587 — SMTP and mail submission. Secure relays, authenticate, monitor abuse.',
          '53 — DNS. Restrict recursion; avoid exposing internal resolvers.',
          '80 / 443 — HTTP and HTTPS. Redirect to HTTPS; never expose admin panels casually.',
          '123 — NTP. Authenticate time sources where supported; time matters for logs.',
          '3306 — MySQL. Keep private; never expose to the public internet.',
          '3389 — RDP. High-value target; require MFA, restrict access, patch.',
          '5432 — PostgreSQL. Private networking and least privilege.',
          '6379 — Redis. Frequently misconfigured; never leave unauthenticated publicly.',
          '8080 / 8443 — Common alternate web ports. Inventory them; they are often forgotten.',
        ],
      },
      {
        title: 'How to check your own host',
        paragraphs: [
          'On Linux, ss -tulpn lists listening TCP and UDP sockets with the owning process. From another machine you own, a port scan can confirm exposure — but only with explicit authorization for the target. Scanning third-party systems is not a harmless learning exercise.',
          'For cloud services, security groups and firewall rules are the first place to check. A service may listen locally yet be unreachable externally, which is often exactly what you want.',
        ],
        code: {
          label: 'Local inspection (authorized systems only)',
          content: `ss -tulpn
sudo lsof -i -P -n | grep LISTEN
ufw status
# Cloud: review security group ingress rules`,
        },
      },
    ],
  },
  {
    id: 'phishing-playbook',
    title: 'Phishing response playbook',
    category: 'Field Guide',
    type: 'Response guide',
    readTime: 6,
    summary:
      'What to do in the first hour after a suspected phishing click, in a calm and ordered sequence.',
    tags: ['phishing', 'incident response', 'email'],
    sections: [
      {
        title: 'First 10 minutes',
        paragraphs: [
          'Stop interacting with the message or page. If you entered credentials, assume they are compromised. Do not delete the email before reporting it; the security team needs the original headers. If malware is suspected, disconnect the device from the network but leave it powered on unless instructed otherwise.',
          'From a different, trusted device, change the affected password and revoke active sessions. Enable or re-register MFA if the attacker may have altered it. Check mailbox rules, forwarding addresses and recovery options for unauthorized changes.',
        ],
        bullets: [
          'Report the original message to security or IT.',
          'Change the password from a separate device.',
          'Revoke sessions and review MFA methods.',
          'Check payment or banking accounts if details were entered.',
          'Note the time and actions taken for the timeline.',
        ],
      },
      {
        title: 'Contain the campaign',
        paragraphs: [
          'Security teams should search for other recipients using the same sender, subject, URL or attachment hash. Block confirmed malicious indicators, but avoid broad blocks that break legitimate services. Preserve evidence: message headers, URLs, screenshots and affected account logs.',
          'If credentials were used, review sign-in logs for impossible travel, new devices, mailbox rule changes and OAuth consent grants. Attackers often persist through a token or forwarding rule even after a password reset.',
        ],
      },
      {
        title: 'After the dust settles',
        paragraphs: [
          'Write a short incident review: what happened, what worked, what slowed you down and what will change. Update filters and training only where evidence supports it. Avoid shaming the person who clicked; shame reduces future reporting.',
          'If personal or financial data was exposed, follow your organization’s legal and regulatory notification process. Do not improvise disclosure.',
        ],
      },
    ],
  },
  {
    id: 'home-lab',
    title: 'Build a safe home lab',
    category: 'Field Guide',
    type: 'Setup guide',
    readTime: 7,
    summary:
      'A budget-conscious way to practice Linux, networking and defensive monitoring without exposing your real network.',
    tags: ['lab', 'linux', 'practice'],
    sections: [
      {
        title: 'Start isolated',
        paragraphs: [
          'Use a hypervisor such as VirtualBox, VMware or Hyper-V to run virtual machines on your computer. Prefer an internal or host-only network so lab machines can talk to each other without exposing services to your home network or the internet. Take a snapshot before experiments.',
          'A minimal lab can be two VMs: a Linux server and a Linux client. Add a deliberately vulnerable application only if it is maintained and isolated. Never expose a vulnerable lab to the public internet, even briefly.',
        ],
        bullets: [
          'Host-only or internal virtual network.',
          'Snapshots before configuration changes.',
          'No shared folders containing personal data.',
          'Strong, unique credentials even inside the lab.',
          'Document what you change and how to reset.',
        ],
      },
      {
        title: 'Practice defensive skills',
        paragraphs: [
          'Install a small web server, generate logs, then practice reading them. Create users and groups, set permissions, and test access. Use tcpdump or Wireshark on the isolated network to see traffic. Write a Python script to parse a log and summarize events.',
          'If you want to practice offensive techniques, use intentionally vulnerable platforms designed for it and follow their rules. Authorization is explicit in those environments. Never point a scanner at an address you do not own or control.',
        ],
      },
      {
        title: 'Keep it maintainable',
        paragraphs: [
          'Automate lab setup with a script or infrastructure-as-code tool once you understand the manual steps. Snapshot a clean state and label it. Delete unused machines and credentials; an abandoned lab is still a set of vulnerable systems.',
          'The goal is understanding, not collecting tools. A two-machine lab you actually use beats a rack of unused equipment.',
        ],
      },
    ],
  },
  {
    id: 'owasp-overview',
    title: 'OWASP Top 10, plainly explained',
    category: 'Research Digest',
    type: 'Web security briefing',
    readTime: 9,
    summary:
      'The recurring web application risks that matter most, translated from security jargon into engineering decisions.',
    tags: ['web', 'owasp', 'appsec'],
    sections: [
      {
        title: 'Access control is still number one',
        paragraphs: [
          'Broken access control means users can do things they should not: view another account’s data, reach admin endpoints or modify records by changing an identifier. The fix is server-side authorization checks on every sensitive object and action, tested with multiple roles.',
          'Insecure direct object references are a specific form: an endpoint accepts an object ID and returns it without checking ownership. Use unpredictable IDs only as defense in depth; always enforce permission.',
        ],
      },
      {
        title: 'Injection and misconfiguration',
        paragraphs: [
          'Injection remains dangerous because it turns data into commands. Parameterized queries, context-aware output encoding and safe subprocess APIs are the durable fixes. Cryptographic failures and insecure design often come from defaults copied without understanding: weak password hashing, missing TLS validation, secrets in client bundles.',
          'Security misconfiguration includes verbose errors, default accounts, unnecessary features, missing headers and overly broad cloud permissions. Hardened baselines and automated configuration checks catch what human review misses.',
        ],
      },
      {
        title: 'Supply chain and monitoring',
        paragraphs: [
          'Applications depend on packages, containers, build systems and third-party scripts. Vulnerable and outdated components are common. Maintain an inventory, monitor advisories, pin versions thoughtfully and have a patch process. Verify signatures where the ecosystem supports it.',
          'Insufficient logging and monitoring delays detection. Log authentication events, authorization failures and administrative actions without secrets. Alert on patterns that matter and rehearse what to do when an alert fires. A dashboard nobody reviews is not monitoring.',
        ],
      },
    ],
  },
  {
    id: 'linux-logs',
    title: 'Linux log locations & first triage',
    category: 'Cheat Sheet',
    type: 'Map',
    readTime: 5,
    summary:
      'Where evidence lives on a typical Linux system, and the read-only commands to start an investigation.',
    tags: ['linux', 'logs', 'triage'],
    sections: [
      {
        title: 'Where to look',
        paragraphs: [
          'Modern distributions vary, but the following locations cover most systems. Use journalctl first for systemd-managed services, then check application-specific directories. Preserve originals and record timestamps and time zones.',
        ],
        bullets: [
          '/var/log/auth.log or /var/log/secure — authentication events.',
          '/var/log/syslog or /var/log/messages — general system messages.',
          '/var/log/nginx/ and /var/log/apache2/ — web server access and errors.',
          '/var/log/kern.log — kernel messages.',
          '/var/log/audit/audit.log — audit framework events, if enabled.',
          'journalctl — systemd journal for all managed units.',
          '~/.bash_history — interactive shell history (incomplete and easily altered).',
        ],
      },
      {
        title: 'Read-only first pass',
        paragraphs: [
          'Start with uptime, disk and memory, then errors. Confirm the host identity and time. Look for unexpected listening ports, recent login failures and service restarts. Save command outputs to a working notes file.',
        ],
        code: {
          label: 'First-pass commands',
          content: `hostnamectl
uptime
date -u
df -h
free -h
journalctl -p err --since "24 hours ago" --no-pager
grep -i "failed" /var/log/auth.log | tail -n 30
ss -tulpn
last -n 10`,
        },
      },
    ],
  },
  {
    id: 'privacy-settings',
    title: 'Privacy hardening field guide',
    category: 'Field Guide',
    type: 'Checklist',
    readTime: 6,
    summary:
      'Reduce data exposure across accounts, browsers, devices and phone number recovery — without disappearing from modern life.',
    tags: ['privacy', 'accounts', 'browser'],
    sections: [
      {
        title: 'Accounts and recovery',
        paragraphs: [
          'Your email and phone number are recovery keys for many services. Protect the email account with strong, phishing-resistant MFA. Consider whether your phone number needs to be the recovery path; SIM swapping is a real threat. Use recovery codes stored offline.',
          'Review connected apps and OAuth grants quarterly. Remove apps you no longer use. Limit the data you give to services that do not need it. Use unique aliases for newsletters and low-trust signups if your provider supports them.',
        ],
      },
      {
        title: 'Browser and device',
        paragraphs: [
          'Install updates automatically. Use a browser with strong isolation and tracking protection. Review extensions: each one can read page content unless tightly scoped. Remove unused extensions. Use full-disk encryption and a screen lock.',
          'Privacy is not about having nothing to hide. It is about controlling what is shared, with whom and for how long. Make deliberate choices rather than accepting defaults.',
        ],
        bullets: [
          'Unique passwords in a manager.',
          'Phishing-resistant MFA on email.',
          'Review sessions and OAuth grants.',
          'Minimal browser extensions.',
          'Automatic updates and disk encryption.',
          'Turn off ad personalization where it adds no value.',
        ],
      },
    ],
  },
  {
    id: 'career-paths',
    title: 'Security career paths, honestly compared',
    category: 'Research Digest',
    type: 'Career briefing',
    readTime: 7,
    summary:
      'SOC, AppSec, cloud, GRC and offensive security — what the day-to-day work actually looks like.',
    tags: ['career', 'soc', 'appsec'],
    sections: [
      {
        title: 'Defensive operations',
        paragraphs: [
          'SOC analysts monitor alerts, triage incidents and improve detection. The work is structured and shift-based in many organizations, with a clear learning path toward incident response and threat hunting. Strong fundamentals in networking, logs and operating systems matter more than tool names.',
          'Incident response is higher-pressure and project-based: contain, investigate, recover and write. It rewards calm judgment and documentation. Threat hunting is proactive and analytical, often requiring scripting and data skills.',
        ],
      },
      {
        title: 'Engineering and assurance',
        paragraphs: [
          'Application security works with developers to find and prevent flaws. It combines code review, threat modeling, testing and secure design. Cloud security focuses on identity, configuration, network boundaries and automation across providers. GRC translates risk and regulation into policy and evidence; it is communication-heavy and organizationally central.',
          'Offensive security includes penetration testing and red teaming. It looks glamorous from the outside but is mostly scoping, documentation, careful testing and reporting. Authorization and ethics are non-negotiable.',
        ],
      },
      {
        title: 'How to choose',
        paragraphs: [
          'Try small projects before committing to a path. Build a log parser, review a friend’s web app with permission, configure a cloud environment securely, or write a risk assessment. Notice which work gives you energy: deep focus, human coordination, building, breaking or explaining.',
          'Certifications can help with filtering, but demonstrable work and clear communication often matter more. This platform’s documents are demos, not credentials. Use them as learning milestones, not claims of professional certification.',
        ],
      },
    ],
  },
  {
    id: 'tls-checklist',
    title: 'TLS configuration checklist',
    category: 'Cheat Sheet',
    type: 'Checklist',
    readTime: 5,
    summary:
      'A concise list for deploying HTTPS without accidentally weakening it.',
    tags: ['tls', 'https', 'cryptography'],
    sections: [
      {
        title: 'Server configuration',
        paragraphs: [
          'Use TLS 1.2 and 1.3, prefer modern cipher suites, and automate certificate renewal. Disable obsolete protocols and weak ciphers. Keep the server and TLS library patched; protocol support is only as good as the implementation.',
        ],
        bullets: [
          'Valid certificate matching the hostname.',
          'Automated renewal with monitoring.',
          'TLS 1.2+ only; prefer 1.3.',
          'HSTS after confirming HTTPS works everywhere.',
          'OCSP stapling where supported.',
          'Redirect all HTTP traffic to HTTPS.',
        ],
      },
      {
        title: 'Client and application checks',
        paragraphs: [
          'Never disable certificate validation to fix an error. Pin certificates only with a rotation plan. Use platform trust stores or a maintained CA bundle. Test with multiple clients, including older devices your users actually use.',
          'TLS protects data in transit. Encrypt data at rest separately, manage keys deliberately and rotate them. A strong tunnel to a server that stores plaintext is only half a solution.',
        ],
        code: {
          label: 'Inspect a certificate',
          content: `openssl s_client -connect example.com:443 -servername example.com
openssl x509 -in cert.pem -noout -text
curl -vI https://example.com`,
        },
      },
    ],
  },
  {
    id: 'incident-response-first-hour',
    title: 'Incident response: the first hour',
    category: 'Field Guide',
    type: 'Response guide',
    readTime: 7,
    summary:
      'A calm, ordered checklist for the first sixty minutes after a suspected compromise — before you start changing evidence.',
    tags: ['incident response', 'soc', 'playbook'],
    sections: [
      {
        title: 'Stabilize and preserve',
        paragraphs: [
          'The first hour is about reducing harm without destroying the evidence you will need later. Write down what you know, what you suspect and who is involved. Assign one coordinator and one note-taker. Avoid parallel heroics: unclear ownership creates duplicate work and contradictory timelines.',
          'Do not power off a compromised machine unless containment requires it. Memory contains volatile evidence. If isolation is necessary, prefer network containment that keeps the host running and preserves logs.',
        ],
        bullets: [
          'Start a timestamped incident log with decisions and evidence locations.',
          'Establish a safe communication channel outside the suspected environment.',
          'Identify affected accounts and revoke active sessions where appropriate.',
          'Preserve relevant logs before rotating, deleting or rebuilding anything.',
          'Notify the right internal people early; avoid public disclosure until facts are verified.',
        ],
      },
      {
        title: 'Scope before you remediate',
        paragraphs: [
          'Ask three questions: what is definitely affected, what is possibly affected, and what is confirmed clean? Map identities, hosts, network paths and data stores. Attackers rarely stop at the first system you notice, so check authentication logs, endpoint telemetry and cloud audit trails for the same indicators.',
          'Resist the urge to close the ticket by deleting a malicious file. Eradication is a phase, not the first step. A quick cleanup can remove the only evidence of persistence and leave the entry path open.',
        ],
      },
      {
        title: 'Recover with proof',
        paragraphs: [
          'Recovery means restoring service with confidence, not just making the alert disappear. Rebuild from trusted images where possible, rotate credentials and keys, and verify that the original access path is closed. Monitor closely after recovery; reinfection is common when the root cause remains.',
          'Close the loop with a blameless review. Document what slowed detection, what worked under pressure and which controls need investment. The goal is a better system, not a more convincing story.',
        ],
      },
    ],
  },
];

export function getLibraryResource(id: string) {
  return LIBRARY_RESOURCES.find((resource) => resource.id === id);
}
