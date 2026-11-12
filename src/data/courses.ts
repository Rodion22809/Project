import type { Course } from '../lib/types';

export const COURSES: Course[] = [
  {
    slug: 'introduction-to-cybersecurity',
    title: 'Introduction to Cybersecurity',
    tagline: 'Build the mental model before you touch a tool.',
    description:
      'A calm, practical start for complete beginners. Learn what security actually protects, how to reason about risk, and how to build a personal defense plan without drowning in jargon.',
    level: 'Beginner',
    hours: 5,
    icon: 'shield',
    gradient: 'from-neon-400/25 via-emerald-500/10 to-transparent',
    accent: 'text-neon-300',
    tags: ['Foundations', 'Threat modeling', 'Career'],
    outcomes: [
      'Explain confidentiality, integrity and availability with real examples.',
      'Build a simple threat model for a person or small team.',
      'Prioritize account and device hardening actions.',
      'Describe how security work differs from compliance theater.',
    ],
    prerequisites: ['Curiosity', 'A browser', 'No technical background required'],
    lessons: [
      {
        id: 'security-mindset',
        title: 'The security mindset',
        summary:
          'What security professionals actually do, and how to move from fear to structured risk thinking.',
        duration: 24,
        sections: [
          {
            title: 'Security is about decisions under uncertainty',
            paragraphs: [
              'You will never have perfect information or unlimited budget. Security work is the discipline of making defensible decisions anyway: what matters, what is exposed, what could go wrong and what is proportionate to do about it.',
              'This is why security is not the same as compliance. A checklist can be satisfied while the real risk remains. Good security starts with understanding the system and the people who depend on it.',
            ],
            bullets: [
              'Assets: what would hurt if it were lost, leaked or frozen?',
              'Threats: who or what could cause that outcome?',
              'Vulnerabilities: which weaknesses make the outcome possible?',
              'Controls: what reduces likelihood or impact without breaking the mission?',
            ],
          },
          {
            title: 'The attacker’s advantage is not magic',
            paragraphs: [
              'Attackers choose the time, target and method. Defenders must cover many paths with limited attention. That asymmetry is real, but defenders have advantages too: knowledge of the environment, control of identity and logging, and the ability to make high-value paths expensive.',
              'Most breaches use known techniques rather than exotic exploits. Removing default credentials, patching exposed services, enforcing MFA and segmenting networks defeats a large share of real attacks. Boring controls work.',
            ],
          },
        ],
        check: {
          question: 'Which statement best describes a security mindset?',
          options: [
            'Buying the most expensive security product available.',
            'Assuming every system is perfectly safe until proven otherwise.',
            'Reasoning about assets, threats and proportionate controls under uncertainty.',
            'Completing a compliance checklist once per year.',
          ],
          answer: 2,
          explanation:
            'Security is structured risk reasoning. Tools and compliance can support it, but neither replaces understanding the system and its threats.',
        },
      },
      {
        id: 'cia-in-practice',
        title: 'The CIA triad in practice',
        summary:
          'Use confidentiality, integrity and availability to ask better questions about systems you use every day.',
        duration: 28,
        sections: [
          {
            title: 'Three lenses, one system',
            paragraphs: [
              'Confidentiality asks who can read data. Integrity asks whether data and code can be changed without detection. Availability asks whether legitimate users can access the service when they need it. A hospital system, a bank API and a personal photo library weight these differently.',
              'When you evaluate a feature, ask which properties it affects. End-to-end encryption improves confidentiality. Audit logs improve integrity and accountability. Backups improve availability. A single control can also create tension with another: aggressive account lockouts protect against guessing but can enable denial of service.',
            ],
          },
          {
            title: 'Beyond the triad',
            paragraphs: [
              'The triad is a starting vocabulary, not a complete ethical framework. Privacy, safety, transparency and fairness matter too. A system can be confidential and available while still being used to surveil people without consent.',
              'Mature security practice connects technical properties to human outcomes. “Is the data encrypted?” is necessary but incomplete. Ask who holds the keys, what happens when they are compelled to disclose, and whether users understand the trade-off.',
            ],
          },
        ],
        check: {
          question: 'An attacker deletes production backups and encrypts the database. Which CIA property is most directly harmed?',
          options: ['Confidentiality', 'Integrity only', 'Availability', 'None, because encryption is involved'],
          answer: 2,
          explanation:
            'The service and its recovery path are unavailable, which is an availability failure. Encryption is merely the mechanism used to deny access.',
        },
      },
      {
        id: 'threat-modeling-101',
        title: 'Threat modeling 101',
        summary:
          'A lightweight method for finding the risks that matter before they become incidents.',
        duration: 32,
        sections: [
          {
            title: 'Four questions, one page',
            paragraphs: [
              'Threat modeling does not require a week-long workshop. Start with four questions: What are we building? What can go wrong? What are we going to do about it? Did we do a good job? Keep the result short enough that people actually use it.',
              'Draw the data flow: users, devices, networks, services, storage and trust boundaries. Mark where data crosses from one trust level to another. Those boundaries — browser to server, app to database, vendor to internal network — are where many failures occur.',
            ],
            bullets: [
              'List assets and the worst realistic outcome for each.',
              'List entry points and trust boundaries.',
              'Name threats using a simple pattern: “An attacker could ___ by ___ to ___.”',
              'Add controls, owners and review dates.',
            ],
          },
          {
            title: 'A small example',
            paragraphs: [
              'Consider a personal notes app. Assets: note contents and the user’s session. Entry points: login, sync API, sharing links. Threats: credential stuffing, broken access control between accounts, leaked share links, unencrypted backups.',
              'Proportionate controls: passkeys or MFA, server-side authorization checks, expiring share links, encrypted backups and audit events. Each control is testable. That is the difference between a threat model and a wish list.',
            ],
          },
        ],
        check: {
          question: 'Where should a threat model focus first?',
          options: [
            'The parts of the system with the most lines of code.',
            'Trust boundaries and high-value assets.',
            'Only external attackers.',
            'The team’s preferred security vendor.',
          ],
          answer: 1,
          explanation:
            'Trust boundaries and valuable assets reveal where data or authority changes hands — typically the highest-leverage places to analyze.',
        },
      },
      {
        id: 'first-defense-plan',
        title: 'Your first 30-day defense plan',
        summary:
          'A realistic sequence of personal and small-team improvements that compounds over time.',
        duration: 26,
        sections: [
          {
            title: 'Week one: identity',
            paragraphs: [
              'Start with email, because it controls password resets for almost everything else. Turn on strong MFA, preferably a passkey or hardware key. Install a password manager and replace reused passwords for your most critical accounts.',
              'Review active sessions and connected applications. Revoke anything unfamiliar. Remove old accounts you no longer use; an abandoned account is still an attack surface.',
            ],
          },
          {
            title: 'Weeks two to four: exposure and recovery',
            paragraphs: [
              'Update devices and browsers automatically. Remove software you do not need. Check whether any home services are exposed to the internet and close anything that does not need to be public. Turn on full-disk encryption.',
              'Finally, test recovery. Back up important files to a second location and restore one file. Write down what you would do if your phone were lost or your main account were compromised. A simple plan that exists beats a perfect plan that does not.',
            ],
            bullets: [
              'Use unique passwords and a manager.',
              'Protect email with phishing-resistant MFA.',
              'Enable automatic updates and disk encryption.',
              'Keep an offline recovery kit with codes and backup access.',
              'Rehearse one recovery scenario this month.',
            ],
          },
        ],
        check: {
          question: 'Which account should be hardened first, and why?',
          options: [
            'A gaming account, because it has the most friends.',
            'Email, because it is the recovery channel for other accounts.',
            'A shopping account, because it stores payment details.',
            'None — all accounts are equally urgent.',
          ],
          answer: 1,
          explanation:
            'Email controls password resets and recovery for most services, making it a single point of failure worth protecting first.',
        },
      },
    ],
  },
  {
    slug: 'ethical-hacking-basics',
    title: 'Ethical Hacking Basics',
    tagline: 'Think like an adversary. Act like a professional.',
    description:
      'An ethics-first introduction to security testing. Learn how scoping, reconnaissance, vulnerability analysis and reporting fit together — and why authorization is the line between research and crime.',
    level: 'Beginner',
    hours: 7,
    icon: 'terminal',
    gradient: 'from-violet-500/25 via-indigo-500/10 to-transparent',
    accent: 'text-violet-300',
    tags: ['Ethics', 'Testing', 'Reporting'],
    outcomes: [
      'Write a clear scope and authorization checklist.',
      'Perform passive reconnaissance on your own assets.',
      'Reason about vulnerabilities without exploiting real targets.',
      'Write a concise, responsible disclosure report.',
    ],
    prerequisites: ['Introduction to Cybersecurity recommended', 'Basic command-line comfort'],
    lessons: [
      {
        id: 'ethics-scope-consent',
        title: 'Ethics, scope and consent',
        summary:
          'The non-negotiable boundaries of legal security testing and how to document them.',
        duration: 26,
        sections: [
          {
            title: 'Authorization is the foundation',
            paragraphs: [
              'Testing a system without permission is unauthorized access, regardless of intent or whether you “only looked”. Written authorization must identify the systems in scope, the time window, permitted techniques, contacts and emergency stop procedures.',
              'Verbal approval is not enough. The person granting permission must actually have authority over the systems. A contractor cannot authorize testing of a client’s cloud tenant unless the client has given them that authority.',
            ],
            bullets: [
              'Systems and IP ranges explicitly in scope.',
              'Start and end dates, including time zone.',
              'Allowed and forbidden techniques.',
              'Handling rules for any sensitive data encountered.',
              'Primary and escalation contacts.',
              'Rules for stopping if service impact occurs.',
            ],
          },
          {
            title: 'Ethics beyond legality',
            paragraphs: [
              'Something can be legal and still be harmful. Minimize data collection, avoid accessing personal information beyond what is necessary to demonstrate a finding, and never publish exploit details before remediation. A tester who crashes a service or exposes customers has failed, even with a signed contract.',
              'The profession depends on trust. Treat scope, confidentiality and disclosure timelines as core skills, not paperwork.',
            ],
          },
        ],
        check: {
          question: 'A friend asks you to test their company’s website. What is the minimum appropriate next step?',
          options: [
            'Run a quick scan; it is harmless and they asked.',
            'Ask them to confirm in writing that they are authorized, along with scope and permitted methods.',
            'Wait until after business hours and test anonymously.',
            'Test only the login page, since that is the most important part.',
          ],
          answer: 1,
          explanation:
            'Permission must be explicit, written and granted by someone with authority. Scope and permitted techniques protect both the tester and the organization.',
        },
      },
      {
        id: 'recon-osint',
        title: 'Reconnaissance and OSINT',
        summary:
          'Map your own public footprint using open sources — before an attacker does.',
        duration: 34,
        sections: [
          {
            title: 'Passive first',
            paragraphs: [
              'Reconnaissance gathers information about a target. Passive reconnaissance uses public sources without directly touching the target’s systems. It includes DNS records, certificate transparency logs, public code repositories, job postings and archived pages.',
              'Each source reveals architecture or organizational detail. A job posting for a “Senior Kubernetes Engineer” hints at infrastructure. A GitHub commit may contain a forgotten internal hostname. Certificate logs list subdomains that were never meant to be secret.',
            ],
            code: {
              label: 'Passive checks on a domain you own',
              content: `# Public DNS records
dig example.com ANY +noall +answer

# Certificate transparency (browser or API)
# https://crt.sh/?q=example.com

# HTTP headers only
curl -I https://example.com

# Robots and security policy
curl https://example.com/robots.txt
curl https://example.com/.well-known/security.txt`,
            },
          },
          {
            title: 'Document, do not intrude',
            paragraphs: [
              'Record what you find and where you found it. Screenshots and timestamps matter. Stay within public information: do not attempt to access private repositories, bypass authentication or use leaked credentials.',
              'For defensive teams, run this exercise quarterly. Remove stale subdomains, rotate exposed API keys, close unused services and ensure the public footprint matches what you intend to expose.',
            ],
          },
        ],
        check: {
          question: 'Which activity is passive reconnaissance?',
          options: [
            'Sending crafted login requests to a target.',
            'Reading certificate transparency logs for a domain.',
            'Exploiting a discovered vulnerability.',
            'Brute-forcing an admin panel.',
          ],
          answer: 1,
          explanation:
            'Certificate transparency logs are public records. Reading them does not directly interact with the target’s systems.',
        },
      },
      {
        id: 'vulnerability-thinking',
        title: 'Vulnerability thinking',
        summary:
          'A pattern-based way to spot weaknesses in design, configuration and code without chasing tools.',
        duration: 38,
        sections: [
          {
            title: 'Patterns beat memorization',
            paragraphs: [
              'Vulnerabilities often fall into recurring patterns: missing authorization, untrusted input, exposed secrets, outdated components, unsafe defaults, confused trust boundaries and inadequate logging. Learn the patterns and you can reason about unfamiliar systems.',
              'When reviewing a feature, ask: Who can call this? What do they control? What does the server trust? Where does data cross a boundary? What happens on failure? What evidence is logged? These questions reveal more than a scanner report.',
            ],
            bullets: [
              'Authentication vs. authorization: who are you vs. what may you do?',
              'Input handling: validate types, encode output, parameterize queries.',
              'Secrets: never in source code, URLs or client-side bundles.',
              'Dependencies: inventory and patch known vulnerabilities.',
              'Failures: deny by default; do not leak stack traces or internals.',
            ],
          },
          {
            title: 'Proof without harm',
            paragraphs: [
              'A finding is not credible merely because a tool flagged it. Verify the behavior safely: reproduce with the least intrusive request, avoid accessing other users’ data, and record evidence that demonstrates impact without causing it.',
              'If exploitation would risk harm, stop and report the suspected weakness with the evidence you have. Professional judgment includes knowing when not to proceed.',
            ],
          },
        ],
        check: {
          question: 'A page shows an admin button only to admins, but the API accepts the request from any logged-in user. What is the flaw?',
          options: [
            'Missing input validation',
            'Broken access control / missing authorization',
            'Weak encryption',
            'DNS misconfiguration',
          ],
          answer: 1,
          explanation:
            'Hiding a button in the interface is not authorization. The server must verify permission for every sensitive action.',
        },
      },
      {
        id: 'reporting-disclosure',
        title: 'Reporting and responsible disclosure',
        summary:
          'Turn technical findings into a report a busy engineering team can act on.',
        duration: 30,
        sections: [
          {
            title: 'Write for the fixer',
            paragraphs: [
              'A good report starts with impact, not a tool dump. State what an attacker could do, the affected component, the conditions required and the evidence. Then give clear reproduction steps and a specific remediation recommendation.',
              'Separate observations from speculation. Assign severity based on realistic impact and exploitability, not on a scanner’s color. Include a timeline, scope, contacts and any data-handling constraints.',
            ],
            bullets: [
              'Title: one sentence describing the weakness and impact.',
              'Summary: affected asset, who can exploit it, what happens.',
              'Reproduction: minimal, numbered, reproducible steps.',
              'Evidence: redact personal data and secrets.',
              'Remediation: concrete and testable.',
              'Timeline: discovery, report, acknowledgement, fix, disclosure.',
            ],
          },
          {
            title: 'Responsible disclosure',
            paragraphs: [
              'Give the vendor a reasonable opportunity to fix the issue before public disclosure. Follow their security.txt or published vulnerability disclosure policy. Escalate through a neutral coordinator only if the vendor is unresponsive and the risk to users is significant.',
              'Never demand payment or threaten disclosure to force a reward. That crosses from research into extortion. If a bug bounty is offered, follow its rules; if not, reporting is still the ethical choice.',
            ],
          },
        ],
        check: {
          question: 'What belongs at the top of a vulnerability report?',
          options: [
            'The full command history and tool output.',
            'A clear statement of impact and the affected component.',
            'A demand for payment.',
            'A list of every possible vulnerability in the industry.',
          ],
          answer: 1,
          explanation:
            'Decision-makers need to understand impact and scope first. Technical detail supports that summary; it does not replace it.',
        },
      },
    ],
  },
  {
    slug: 'linux-fundamentals',
    title: 'Linux Fundamentals',
    tagline: 'The command line, demystified.',
    description:
      'Learn the Linux skills that underpin servers, containers and security operations. Files, permissions, processes, services and logs — practiced in a safe, local environment.',
    level: 'Beginner',
    hours: 8,
    icon: 'linux',
    gradient: 'from-amber-400/25 via-orange-500/10 to-transparent',
    accent: 'text-amber-300',
    tags: ['Linux', 'CLI', 'Operations'],
    outcomes: [
      'Navigate the filesystem and work confidently in a shell.',
      'Reason about permissions, ownership and least privilege.',
      'Inspect processes, services and listening ports.',
      'Triage basic issues using logs and system tools.',
    ],
    prerequisites: ['A computer with a terminal or a Linux VM', 'No prior Linux experience'],
    lessons: [
      {
        id: 'shell-filesystem',
        title: 'Shell and filesystem',
        summary:
          'Build muscle memory for navigation, reading files and composing commands.',
        duration: 35,
        sections: [
          {
            title: 'Paths, files and streams',
            paragraphs: [
              'The shell starts in a working directory. Paths can be absolute (starting at /) or relative (starting from where you are). Dot means the current directory, dot-dot means the parent, and tilde expands to your home.',
              'Commands receive input, write output and report errors on separate streams: stdin, stdout and stderr. Redirection sends these streams to files; pipes connect the output of one command to the input of another. This is the core of Unix composition.',
            ],
            code: {
              label: 'Essential navigation',
              content: `pwd
ls -la
cd /etc
cd ..
cd ~
cat /etc/hostname
wc -l /var/log/syslog
grep "error" app.log | head -n 20`,
            },
          },
          {
            title: 'Find things without guessing',
            paragraphs: [
              'Use find to locate files by name, type or age. Use grep to search contents. Use man and --help to discover options. Learn to read output rather than memorizing dozens of flags.',
              'Be careful with recursive commands and wildcards. A misplaced space can turn a harmless cleanup into data loss. Run pwd and ls first, and test destructive commands on disposable files.',
            ],
            code: {
              label: 'Find and inspect',
              content: `find /var/log -type f -name "*.log" -mtime -1
grep -R "failed" /var/log 2>/dev/null
file suspicious.bin
stat notes.txt
du -sh /var/log/* | sort -h`,
            },
          },
        ],
        check: {
          question: 'What does the pipe operator | do?',
          options: [
            'Runs two commands at the same time in separate terminals.',
            'Sends stdout of the left command to stdin of the right command.',
            'Creates a new file.',
            'Escalates privileges.',
          ],
          answer: 1,
          explanation:
            'Pipes connect commands: the left side’s standard output becomes the right side’s standard input.',
        },
      },
      {
        id: 'permissions-users',
        title: 'Permissions and users',
        summary:
          'Understand rwx modes, ownership, sudo and the principle of least privilege.',
        duration: 38,
        sections: [
          {
            title: 'Reading a mode',
            paragraphs: [
              'The ls -l output begins with a ten-character string. The first character is the file type; the next nine are permissions for owner, group and others. Each set has read (4), write (2) and execute (1) bits.',
              'Directories use execute permission to mean “can traverse into”. A directory may allow reading names but not accessing files, or vice versa. Private keys should normally be 600. Directories that hold private data are often 700.',
            ],
            code: {
              label: 'Modes in practice',
              content: `ls -l deploy.sh
# -rwxr-xr--  owner rwx, group rx, others r

chmod 600 id_ed25519
chmod 755 public-tool
chown alice:devs report.txt
umask`,
            },
          },
          {
            title: 'Root is not a workflow',
            paragraphs: [
              'root can do anything, which makes mistakes catastrophic. Use sudo for specific administrative commands rather than operating as root. Service accounts should have only the access their service needs.',
              'Be cautious with recursive permission changes on system paths. Prefer targeted commands and check with ls -l before and after. On modern systems, capabilities can grant a narrow privilege without full root — another expression of least privilege.',
            ],
          },
        ],
        check: {
          question: 'Which mode is appropriate for a private SSH key?',
          options: ['644', '600', '777', '755'],
          answer: 1,
          explanation:
            '600 allows only the owner to read and write the file. SSH will usually refuse keys that are accessible by other users.',
        },
      },
      {
        id: 'processes-services',
        title: 'Processes and services',
        summary:
          'See what is running, who owns it and what is listening on the network.',
        duration: 32,
        sections: [
          {
            title: 'Processes have identities',
            paragraphs: [
              'Every process has a PID, a parent, an owner and a set of resources. ps shows a snapshot; top or htop shows live usage. pgrep finds processes by pattern. Signals such as SIGTERM ask a process to stop gracefully, while SIGKILL forces it — always try graceful first.',
              'A process’s user determines its access. If a web service runs as root, a vulnerability in that service becomes a system-wide compromise. Run services as dedicated users and restrict their file access.',
            ],
            code: {
              label: 'Process inspection',
              content: `ps aux --sort=-%cpu | head
pgrep -a nginx
sudo ss -tulpn
lsof -i :8080
kill -TERM 1234`,
            },
          },
          {
            title: 'systemd and sockets',
            paragraphs: [
              'Most modern distributions use systemd to manage services. systemctl start, stop, enable and status control them. A listening socket is a service waiting for connections; ss shows which process owns each port.',
              'If a service is failing, read its logs before restarting it repeatedly. The error message usually names the missing file, permission or configuration problem. Restarting without reading the log hides the cause.',
            ],
            code: {
              label: 'Service management',
              content: `systemctl status ssh
sudo systemctl restart ssh
systemctl is-enabled ssh
journalctl -u ssh -n 50 --no-pager
ss -tulpn | grep :22`,
            },
          },
        ],
        check: {
          question: 'A service fails immediately after start. What should you check first?',
          options: [
            'Reinstall the operating system.',
            'Its logs via journalctl -u <service>.',
            'Change every permission to 777.',
            'Disable the firewall.',
          ],
          answer: 1,
          explanation:
            'Service logs usually identify the specific configuration, permission or dependency error. Fix the cause, not the symptom.',
        },
      },
      {
        id: 'logs-triage',
        title: 'Logs and basic triage',
        summary:
          'Use logs as evidence: filter noise, establish a timeline and reason toward a cause.',
        duration: 35,
        sections: [
          {
            title: 'Know where evidence lives',
            paragraphs: [
              'Systemd services log to the journal, accessible with journalctl. Many applications also write to /var/log. Authentication events, web access logs, kernel messages and application errors may live in different places. Know the layout of the system you are investigating.',
              'Timestamps are critical. Confirm the timezone and whether logs are local or UTC. A sequence that looks impossible is often just two clocks disagreeing.',
            ],
            bullets: [
              'journalctl -u service — service-specific history.',
              'journalctl --since "1 hour ago" — recent system events.',
              'grep "Failed password" /var/log/auth.log — authentication failures.',
              'tail -f — follow live activity during a test.',
              'last / who — recent logins and sessions.',
            ],
          },
          {
            title: 'A simple triage loop',
            paragraphs: [
              'Start with a clear question: what changed, when, and for whom? Gather evidence from several sources. Form a hypothesis, then test it with a read-only command. Avoid making changes until you understand the likely cause.',
              'Write down commands and outputs as you go. During an incident, memory is unreliable and a timeline is essential. Preserve logs before clearing or rotating them, especially if an investigation may be needed.',
            ],
            code: {
              label: 'Triage starter',
              content: `uptime
df -h
free -h
journalctl -p err --since today --no-pager
grep -c "Failed password" /var/log/auth.log
ss -tulpn`,
            },
          },
        ],
        check: {
          question: 'Why should you record a timeline during triage?',
          options: [
            'To make the log files smaller.',
            'To sequence events and support sound conclusions during and after an incident.',
            'Because Linux requires it to run commands.',
            'To avoid reading logs.',
          ],
          answer: 1,
          explanation:
            'A timeline organizes evidence, exposes contradictions and preserves reasoning for later review or handover.',
        },
      },
    ],
  },
  {
    slug: 'networking-essentials',
    title: 'Networking Essentials',
    tagline: 'See the path every packet takes.',
    description:
      'A visual, practical introduction to how the internet moves data: layers, addressing, DNS, HTTP and encrypted tunnels. Built for people who want to understand what “the network” actually is.',
    level: 'Beginner',
    hours: 6,
    icon: 'network',
    gradient: 'from-sky-400/25 via-cyan-500/10 to-transparent',
    accent: 'text-sky-300',
    tags: ['TCP/IP', 'DNS', 'HTTP'],
    outcomes: [
      'Describe encapsulation across the TCP/IP layers.',
      'Read IPv4 addresses, subnets and common ports.',
      'Trace a DNS and HTTP request end to end.',
      'Explain what a VPN and TLS actually protect.',
    ],
    prerequisites: ['Basic computer literacy', 'Curiosity about how the internet works'],
    lessons: [
      {
        id: 'packets-layers',
        title: 'Packets and layers',
        summary:
          'How data is sliced, addressed and reassembled across networks.',
        duration: 30,
        sections: [
          {
            title: 'Encapsulation',
            paragraphs: [
              'Networks send data in packets. As data moves down the stack, each layer adds its own header: application data is wrapped by TCP or UDP, then IP, then a link-layer frame. The receiver unwraps the layers in reverse. This separation lets IP carry many kinds of traffic and lets applications ignore the physical network.',
              'TCP provides ordered, reliable delivery with acknowledgements and retransmission. UDP is connectionless and lower overhead, used for DNS queries, real-time media and many games. Neither is encrypted by itself; TLS adds confidentiality and integrity on top.',
            ],
            bullets: [
              'Application — HTTP, DNS, SMTP, SSH.',
              'Transport — TCP and UDP ports.',
              'Internet — IP addressing and routing.',
              'Link — Ethernet, Wi-Fi and local delivery.',
            ],
          },
          {
            title: 'Ports and connections',
            paragraphs: [
              'A port identifies a service on a host. Servers commonly listen on well-known ports: 22 for SSH, 53 for DNS, 80 and 443 for HTTP/HTTPS, 3306 for MySQL. A connection is identified by the source and destination address and port pair.',
              'Firewalls filter on these attributes. Exposing a database port to the internet is risky not because the port number is magic, but because it offers a direct path to a service that should usually be private.',
            ],
          },
        ],
        check: {
          question: 'Which transport protocol provides ordered, reliable delivery?',
          options: ['UDP', 'TCP', 'ICMP', 'DNS'],
          answer: 1,
          explanation:
            'TCP establishes a connection, acknowledges data and retransmits lost segments. UDP does not guarantee delivery or ordering.',
        },
      },
      {
        id: 'ip-subnets',
        title: 'IP addressing and subnets',
        summary:
          'Read addresses and CIDR notation, and understand why segmentation matters.',
        duration: 34,
        sections: [
          {
            title: 'Address plus prefix',
            paragraphs: [
              'IPv4 addresses are 32 bits. A subnet mask divides the address into a network portion and a host portion. CIDR notation writes the prefix length after a slash: 192.168.1.10/24 means the first 24 bits identify the network.',
              'Private ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) are not routed on the public internet. Your router performs NAT so many private devices can share one public address.',
            ],
            code: {
              label: 'Common network facts',
              content: `192.168.1.10/24   -> network 192.168.1.0, 254 usable hosts
10.0.0.0/8         -> private, large enterprise range
127.0.0.1          -> loopback
169.254.0.0/16     -> link-local (often means DHCP failed)

Default gateway: the router that forwards traffic off-subnet
Broadcast: last address in an IPv4 subnet`,
            },
          },
          {
            title: 'Segmentation is a security control',
            paragraphs: [
              'Subnets divide networks for performance and control. A guest Wi-Fi network should not reach internal servers. A database subnet should not be directly reachable from the internet. Security groups and firewall rules enforce which paths are allowed.',
              'Segmentation limits lateral movement: if one laptop is compromised, the attacker should not be able to scan every service in the organization. It also makes monitoring easier because traffic patterns become more predictable.',
            ],
          },
        ],
        check: {
          question: 'Why does network segmentation improve security?',
          options: [
            'It makes every password stronger.',
            'It limits which systems can communicate, reducing lateral movement.',
            'It encrypts all traffic automatically.',
            'It removes the need for firewalls.',
          ],
          answer: 1,
          explanation:
            'Segmentation restricts reachable paths. If one host is compromised, the attacker cannot freely access unrelated systems.',
        },
      },
      {
        id: 'dns-http',
        title: 'DNS and HTTP in motion',
        summary:
          'Follow a URL from name resolution to encrypted response.',
        duration: 32,
        sections: [
          {
            title: 'From name to address',
            paragraphs: [
              'A browser first checks caches, then asks a recursive resolver. The resolver walks the DNS hierarchy from root to top-level domain to the authoritative nameserver, then returns the record. TTL values control how long the answer is cached.',
              'DNS is mostly unencrypted by default, which exposes queries to local networks and intermediaries. DNS over HTTPS or DNS over TLS encrypts the transport, but the resolver still sees your queries. Privacy depends on who operates the resolver and what they log.',
            ],
          },
          {
            title: 'HTTP and HTTPS',
            paragraphs: [
              'HTTP is a request-response protocol. A request includes a method, path, headers and optional body; a response includes a status code, headers and body. Cookies carry session state because HTTP itself is stateless.',
              'HTTPS is HTTP inside TLS. The TLS handshake authenticates the server with a certificate and derives session keys. This protects content and headers in transit, but the destination domain may still be visible to network observers through SNI and DNS. Encrypted Client Hello aims to reduce that leakage.',
            ],
            code: {
              label: 'Inspect a request',
              content: `curl -v https://example.com
curl -I https://example.com
curl --http2 https://example.com -o /dev/null

# Key response headers
# strict-transport-security
# content-security-policy
# set-cookie (HttpOnly, Secure, SameSite)`,
            },
          },
        ],
        check: {
          question: 'What does the TLS certificate primarily prove during an HTTPS connection?',
          options: [
            'That the website is honest and free of malware.',
            'That the server’s public key is bound to the requested domain and validated by a trusted authority.',
            'That the user is anonymous.',
            'That the database is encrypted.',
          ],
          answer: 1,
          explanation:
            'A certificate binds a public key to a domain and is validated through a chain of trust. It authenticates the endpoint, not the site’s intentions.',
        },
      },
      {
        id: 'vpn-tunnels',
        title: 'VPNs and secure tunnels',
        summary:
          'What encrypted tunnels protect, where they terminate and what they do not solve.',
        duration: 30,
        sections: [
          {
            title: 'Tunnel endpoints matter',
            paragraphs: [
              'A VPN encrypts traffic between a client and a gateway. Once traffic leaves the gateway, it may be decrypted and forwarded in the clear to the destination — unless the destination itself uses HTTPS. The provider sees your traffic; you have shifted trust rather than eliminated it.',
              'Corporate VPNs typically authenticate users and place them inside a private network. Consumer VPNs mainly change your apparent IP address and protect local-network traffic. WireGuard is a modern, efficient protocol; OpenVPN and IPsec remain common in enterprises.',
            ],
          },
          {
            title: 'Choosing and operating a VPN',
            paragraphs: [
              'Look for clear ownership, a published privacy policy, independent audits and a sustainable business model. Avoid free services with vague data practices. If you operate your own, you become responsible for patching, authentication, logging policy and key management.',
              'A VPN is not a substitute for HTTPS, MFA, patching or phishing awareness. Use it for the problem it solves: protecting traffic across an untrusted network or providing authenticated access to a private network.',
            ],
            bullets: [
              'Use HTTPS regardless of VPN.',
              'Prefer modern protocols and audited implementations.',
              'Keep the client and server patched.',
              'Define a logging and retention policy.',
              'Test for DNS leaks if privacy is the goal.',
            ],
          },
        ],
        check: {
          question: 'After traffic leaves a VPN gateway, is it automatically encrypted to the destination?',
          options: [
            'Yes, the VPN encrypts the whole internet path.',
            'No, only if the destination uses a protocol such as HTTPS.',
            'Only when using a free VPN.',
            'Yes, but only for DNS.',
          ],
          answer: 1,
          explanation:
            'A VPN protects the tunnel to its gateway. From the gateway onward, protection depends on the destination protocol, typically HTTPS.',
        },
      },
    ],
  },
  {
    slug: 'python-for-security',
    title: 'Python for Security',
    tagline: 'Automate the boring defensive work.',
    description:
      'Use Python to read logs, parse data, call APIs and build small safety-conscious tools. Focused on defensive automation and clean, readable code — not malware development.',
    level: 'Intermediate',
    hours: 9,
    icon: 'python',
    gradient: 'from-emerald-400/25 via-teal-500/10 to-transparent',
    accent: 'text-emerald-300',
    tags: ['Python', 'Automation', 'Log analysis'],
    outcomes: [
      'Write readable Python scripts with functions and error handling.',
      'Parse logs and text with regular expressions.',
      'Call an HTTP API safely with timeouts and validation.',
      'Automate repetitive checks without creating new risk.',
    ],
    prerequisites: ['Basic programming concepts helpful', 'Linux Fundamentals recommended'],
    lessons: [
      {
        id: 'python-foundations',
        title: 'Python foundations for security work',
        summary:
          'Types, control flow, functions and the habits that keep scripts maintainable.',
        duration: 40,
        sections: [
          {
            title: 'Small, explicit programs',
            paragraphs: [
              'Python’s readability makes it a good language for security automation. Write small functions with clear inputs and outputs. Use type hints to communicate intent, and handle expected failures instead of letting a script crash halfway through a scan.',
              'Never run code you do not understand, especially from untrusted sources. Pin dependencies, use virtual environments and review what a package does before installing it. Supply-chain risk applies to Python packages too.',
            ],
            code: {
              label: 'A readable starting point',
              content: `from pathlib import Path
from collections import Counter

def count_errors(log_path: Path) -> Counter[str]:
    counts: Counter[str] = Counter()
    for line in log_path.read_text(errors="replace").splitlines():
        if "ERROR" in line:
            parts = line.split()
            if len(parts) > 2:
                counts[parts[2]] += 1
    return counts

if __name__ == "__main__":
    print(count_errors(Path("app.log")).most_common(5))`,
            },
          },
          {
            title: 'Errors are data',
            paragraphs: [
              'Security tooling must fail safely. A network timeout, malformed log line or missing file should produce a clear message, not a traceback dumped into a pipeline. Catch specific exceptions and include context in errors without logging secrets.',
              'Exit codes matter for automation. Return a non-zero status when a check fails so schedulers and CI systems can react. Write output that machines and humans can both read.',
            ],
          },
        ],
        check: {
          question: 'Why are virtual environments recommended for security scripts?',
          options: [
            'They make Python run faster.',
            'They isolate dependencies and reduce conflicts and supply-chain surprises.',
            'They encrypt the script automatically.',
            'They remove the need to review packages.',
          ],
          answer: 1,
          explanation:
            'A venv isolates project dependencies, making versions reproducible and limiting the impact of unrelated or compromised packages.',
        },
      },
      {
        id: 'files-logs-regex',
        title: 'Files, logs and regular expressions',
        summary:
          'Turn messy text into structured evidence with careful parsing.',
        duration: 42,
        sections: [
          {
            title: 'Parse with intent',
            paragraphs: [
              'Log files are semi-structured. Start with a sample, identify stable fields and write a parser that tolerates variation. Regular expressions are powerful but can become unreadable; name your patterns and test them against real lines, including malformed ones.',
              'Avoid catastrophic backtracking by keeping patterns specific. Never parse secrets or personal data you do not need. If you must handle sensitive fields, redact them early and store the minimum required.',
            ],
            code: {
              label: 'Extract failed logins',
              content: `import re
from pathlib import Path

PATTERN = re.compile(
    r"Failed password for (?P<user>\\S+) from (?P<ip>\\d{1,3}(?:\\.\\d{1,3}){3})"
)

def failed_logins(path: Path):
    text = path.read_text(errors="replace")
    return [m.groupdict() for m in PATTERN.finditer(text)]

if __name__ == "__main__":
    for event in failed_logins(Path("auth.log"))[:5]:
        print(event["user"], event["ip"])`,
            },
          },
          {
            title: 'Make it observable',
            paragraphs: [
              'Print a summary, not a flood. Count events, show the top sources and write full details to a file if needed. Add a timestamp and the input path to every run so the output is reproducible.',
              'Test on a copy, never on the only log file. Read-only defaults protect evidence. If a script needs to modify data, require an explicit flag and create a backup first.',
            ],
          },
        ],
        check: {
          question: 'What is a safer default for a log-analysis script?',
          options: [
            'Modify logs in place to save space.',
            'Read only and write output separately, preserving the original evidence.',
            'Delete suspicious lines.',
            'Email all raw logs to a public address.',
          ],
          answer: 1,
          explanation:
            'Preserving originals protects evidence and makes the analysis reproducible. Derived output belongs in a separate file.',
        },
      },
      {
        id: 'http-apis',
        title: 'HTTP and APIs',
        summary:
          'Fetch data with timeouts, validate responses and never hardcode secrets.',
        duration: 38,
        sections: [
          {
            title: 'Be a polite client',
            paragraphs: [
              'Use a library with explicit timeouts and bounded retries. Respect rate limits and service terms. Validate the URL and the response before acting on it. A script that hammers a third-party API is a liability, not automation.',
              'Secrets belong in environment variables or a secret manager, never in source code or shell history. Redact tokens from logs. If a key may have leaked, rotate it — deleting the commit is not enough.',
            ],
            code: {
              label: 'A defensible request',
              content: `import os
import requests

def get_status(url: str) -> int:
    response = requests.get(
        url,
        timeout=10,
        headers={"User-Agent": "darknet-academy-demo/1.0"},
    )
    response.raise_for_status()
    return response.status_code

if __name__ == "__main__":
    api_key = os.environ.get("DEMO_API_KEY")
    print("Key configured:", bool(api_key))
    print(get_status("https://example.com"))`,
            },
          },
          {
            title: 'Validate before trusting',
            paragraphs: [
              'Treat API responses as untrusted input. Check status codes, content type, schema and size before parsing. Do not deserialize arbitrary objects from an untrusted source. Set a maximum response size to avoid memory exhaustion.',
              'If you are integrating with a service, read its security documentation: authentication method, token lifetime, rate limits and logging policy. A working script is not necessarily a safe one.',
            ],
          },
        ],
        check: {
          question: 'Where should an API token live?',
          options: [
            'Hardcoded in the script so it always works.',
            'In an environment variable or secret manager, excluded from version control.',
            'In a public repository issue for easy access.',
            'In the URL for simplicity.',
          ],
          answer: 1,
          explanation:
            'Secrets should be injected at runtime and never committed. URLs and logs are especially likely to leak tokens.',
        },
      },
      {
        id: 'safe-automation',
        title: 'Safe automation',
        summary:
          'Design scripts that are idempotent, rate-limited, logged and easy to stop.',
        duration: 36,
        sections: [
          {
            title: 'Automation is authority',
            paragraphs: [
              'A script with credentials can act at scale. Treat it like a privileged operator. Limit permissions, scope targets, add dry-run mode, require confirmation for destructive actions and log every change with an actor and timestamp.',
              'Idempotence matters: running a check twice should not create duplicates or side effects. For remediation scripts, compute the desired state and change only what differs.',
            ],
            bullets: [
              'Default to dry-run; require an explicit flag to apply changes.',
              'Bound concurrency and request rates.',
              'Set timeouts on every network call.',
              'Log outcomes, not secrets.',
              'Make the stop condition obvious and test it.',
            ],
          },
          {
            title: 'A checklist before you ship',
            paragraphs: [
              'Ask: What is the worst thing this script can do with a typo? Can it be stopped? Who can run it? What does it log? Are dependencies pinned? Has it been tested against a disposable target? Is the authorization documented?',
              'If the script touches systems you do not own, stop. Automation does not create permission. The same legal and ethical boundaries apply whether you type a command or a program does it for you.',
            ],
          },
        ],
        check: {
          question: 'Why should an automation script default to dry-run?',
          options: [
            'To make it slower.',
            'To let operators review intended changes before any destructive action occurs.',
            'Because APIs require it.',
            'To avoid writing logs.',
          ],
          answer: 1,
          explanation:
            'Dry-run exposes the planned changes without applying them, reducing the chance that a bug or typo causes harm.',
        },
      },
    ],
  },
  {
    slug: 'web-security-fundamentals',
    title: 'Web Security Fundamentals',
    tagline: 'Defend the application, not just the perimeter.',
    description:
      'Understand the web attack surface from the inside: injection, broken access control, session security and the headers and habits that make an application harder to break.',
    level: 'Intermediate',
    hours: 7,
    icon: 'globe',
    gradient: 'from-fuchsia-500/25 via-purple-500/10 to-transparent',
    accent: 'text-fuchsia-300',
    tags: ['OWASP', 'AppSec', 'Hardening'],
    outcomes: [
      'Trace a request through browser, server and database.',
      'Recognize injection and broken access-control patterns.',
      'Explain session, cookie and authentication trade-offs.',
      'Apply a practical web hardening checklist.',
    ],
    prerequisites: ['Networking Essentials helpful', 'Basic HTML and JavaScript familiarity'],
    lessons: [
      {
        id: 'how-web-works',
        title: 'How the web works, security-first',
        summary:
          'Map the browser, server, database and third parties — and the trust boundaries between them.',
        duration: 32,
        sections: [
          {
            title: 'The request path',
            paragraphs: [
              'A browser sends an HTTP request to a server, which may call internal services and databases before returning a response. JavaScript runs in the browser and is fully controlled by the user. Anything shipped to the client — API keys, hidden fields, business logic — can be inspected and modified.',
              'Security decisions must happen on the server. Hiding a button is user-interface convenience; authorization is a server-side check. This distinction underpins most web vulnerabilities.',
            ],
            bullets: [
              'Browser: untrusted environment; never trust client input.',
              'Server: enforces authentication, authorization and validation.',
              'Database: stores data; use least-privilege accounts.',
              'Third parties: scripts, CDNs and APIs expand your attack surface.',
              'Trust boundaries: every hop where data or authority changes hands.',
            ],
          },
          {
            title: 'The browser is a security boundary too',
            paragraphs: [
              'The same-origin policy restricts how documents from one origin can interact with another. CORS relaxes that restriction in controlled ways; it is not an authentication mechanism. Cookies with HttpOnly, Secure and SameSite attributes reduce theft and cross-site request risk.',
              'Content Security Policy can reduce the impact of injected scripts, but it must be designed carefully and tested. Security headers are defense in depth, not a substitute for correct code.',
            ],
          },
        ],
        check: {
          question: 'Where must authorization decisions be enforced?',
          options: [
            'Only in the browser interface.',
            'On the server for every sensitive request.',
            'In CSS.',
            'In the database schema only.',
          ],
          answer: 1,
          explanation:
            'Clients can be modified or bypassed entirely. The server must verify permissions for each sensitive operation.',
        },
      },
      {
        id: 'injection-input',
        title: 'Injection and input handling',
        summary:
          'Why concatenating untrusted data into commands, queries or markup is still a top risk.',
        duration: 38,
        sections: [
          {
            title: 'Data must never become code',
            paragraphs: [
              'Injection happens when untrusted input changes the structure of an instruction. SQL injection alters a query; command injection alters a shell command; cross-site scripting injects markup or script into a page. The common root cause is mixing data and syntax.',
              'Defenses differ by context. SQL requires parameterized queries. Shell commands should be avoided or built with argument arrays rather than string concatenation. HTML output must be contextually encoded, and rich text should be sanitized with a maintained library.',
            ],
            code: {
              label: 'Choose the right defense',
              content: `# SQL: parameterize
cursor.execute("SELECT * FROM users WHERE email = %s", (email,))

# Shell: avoid interpolation; prefer a safe API
subprocess.run(["ping", "-c", "1", host], check=True)

# HTML: escape by default in your template engine
# <div>{{ user_comment }}</div>  (autoescaped)

# URL: encode path segments
urllib.parse.quote(segment, safe="")`,
            },
          },
          {
            title: 'Validate on the boundary, encode on output',
            paragraphs: [
              'Validation confirms that input matches expectations: length, type, format and allowed values. It reduces ambiguity but does not replace output encoding. Encode at the point where data enters a new context, because the correct encoding depends on whether the destination is HTML, JavaScript, SQL, a URL or a shell.',
              'Use allowlists rather than blocklists where possible. Attackers can often encode around a blacklist. Fail closed on invalid input, and log validation failures without recording sensitive values.',
            ],
          },
        ],
        check: {
          question: 'What is the primary defense against SQL injection?',
          options: [
            'Hiding the database error messages.',
            'Parameterized queries / prepared statements.',
            'Using a longer database password.',
            'Blocking the word SELECT in input.',
          ],
          answer: 1,
          explanation:
            'Parameterization keeps data separate from SQL syntax. Hiding errors and blocking keywords may reduce noise but do not fix the flaw.',
        },
      },
      {
        id: 'auth-sessions',
        title: 'Authentication and sessions',
        summary:
          'Design login, session and recovery flows that fail safely.',
        duration: 36,
        sections: [
          {
            title: 'Prove identity, then remember it',
            paragraphs: [
              'Authentication verifies identity; session management remembers it. Passwords should be hashed with Argon2id, bcrypt or scrypt and compared in constant time. Login responses should not reveal whether an email exists. Rate limiting and breached-password checks reduce credential-stuffing success.',
              'After login, issue a session identifier with high entropy. Store it in a Secure, HttpOnly cookie with an appropriate SameSite policy. Rotate the session on privilege change and provide a clear logout that invalidates it server-side.',
            ],
          },
          {
            title: 'MFA and recovery',
            paragraphs: [
              'MFA should be resistant to phishing where possible. Passkeys and hardware keys bind credentials to the origin; codes can be relayed by a real-time proxy. Recovery must be as strong as login: a support process that resets MFA after a phone call undermines the entire model.',
              'Session lifetime is a trade-off between security and convenience. Sensitive applications should re-authenticate for high-risk actions. Always let users review and revoke active sessions.',
            ],
            bullets: [
              'Use slow, salted password hashing.',
              'Rate-limit and monitor authentication attempts.',
              'Rotate session IDs after login and privilege changes.',
              'Set Secure, HttpOnly and SameSite cookies.',
              'Make recovery identity-proofed and auditable.',
            ],
          },
        ],
        check: {
          question: 'Why rotate the session identifier after login?',
          options: [
            'To make the cookie larger.',
            'To prevent session fixation attacks that reuse a pre-login identifier.',
            'To improve page load speed.',
            'Because HTTP requires it.',
          ],
          answer: 1,
          explanation:
            'Rotating the session ID after authentication invalidates any identifier an attacker may have planted or observed before login.',
        },
      },
      {
        id: 'hardening-checklist',
        title: 'A practical hardening checklist',
        summary:
          'The controls that consistently reduce web application risk.',
        duration: 30,
        sections: [
          {
            title: 'Build and configure',
            paragraphs: [
              'Patch frameworks and dependencies, remove unused features, and never ship development settings to production. Disable directory listing and verbose errors. Use HTTPS everywhere and redirect HTTP. Store secrets outside the repository and rotate them on a schedule.',
              'Add security headers: Content-Security-Policy, Strict-Transport-Security, X-Content-Type-Options, Referrer-Policy and frame protection via CSP frame-ancestors. Test them; a broken CSP that blocks legitimate scripts often gets loosened until it protects nothing.',
            ],
            bullets: [
              'Inventory dependencies and monitor advisories.',
              'Least-privilege database and cloud roles.',
              'Validate input and encode output by context.',
              'Rate-limit authentication and expensive endpoints.',
              'Log security events without secrets or personal data.',
              'Back up, test restore and document recovery.',
            ],
          },
          {
            title: 'Operate and verify',
            paragraphs: [
              'Security is not finished at deploy. Monitor for anomalies, review access regularly, run dependency and configuration scans, and conduct threat modeling for new features. Use a vulnerability disclosure policy so external researchers have a safe path to report issues.',
              'Test the controls you claim. Can an ordinary user reach an admin endpoint? Does a revoked session still work? Does the CSP actually block inline script? Evidence beats assumptions.',
            ],
          },
        ],
        check: {
          question: 'Which practice most directly reduces the impact of a stolen session cookie?',
          options: [
            'A longer cookie name.',
            'HttpOnly, Secure and SameSite attributes plus session revocation.',
            'Disabling HTTPS.',
            'Removing all logging.',
          ],
          answer: 1,
          explanation:
            'These attributes reduce script access and cross-site transmission, while revocation lets the server terminate a compromised session.',
        },
      },
    ],
  },
];

export function getCourse(slug: string): Course | undefined {
  return COURSES.find((course) => course.slug === slug);
}

export function findLesson(course: Course, lessonId: string) {
  return course.lessons.find((lesson) => lesson.id === lessonId);
}

export const TOTAL_LESSONS = COURSES.reduce(
  (total, course) => total + course.lessons.length,
  0,
);
