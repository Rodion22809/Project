import type { Topic } from '../lib/types';

export const TOPICS: Topic[] = [
  {
    slug: 'what-is-cybersecurity',
    title: 'What is cybersecurity?',
    excerpt:
      'A practical introduction to the discipline: what we protect, who we protect it from, and why security is a property of a system rather than a product you install.',
    category: 'Fundamentals',
    level: 'Beginner',
    minutes: 7,
    updated: '2026-02-12',
    featured: true,
    relatedCourse: 'introduction-to-cybersecurity',
    sections: [
      {
        title: 'Security is a property, not a product',
        paragraphs: [
          'Cybersecurity is the practice of protecting systems, data and people from unauthorized access, disruption or manipulation. It is not a single tool or a firewall you switch on. Security is a property of a whole system: its code, its configuration, its people and its processes.',
          'That distinction matters because most real incidents are not caused by one catastrophic flaw. They emerge from small gaps that line up: an exposed service, a reused password, an unpatched library, a person in a hurry. Defenders therefore think in layers, a strategy known as defense in depth.',
        ],
        bullets: [
          'Confidentiality — only authorized people can read data.',
          'Integrity — data cannot be changed silently or maliciously.',
          'Availability — systems remain usable when legitimate users need them.',
        ],
      },
      {
        title: 'The CIA triad and its limits',
        paragraphs: [
          'The CIA triad — confidentiality, integrity and availability — is the classic vocabulary for describing what security protects. Encrypting a laptop protects confidentiality. A cryptographic signature protects integrity. A backup and a load balancer protect availability.',
          'The triad is useful, but it is not a complete worldview. Modern security also cares about safety, privacy, fairness and the reliability of the supply chain. A system can keep all three CIA properties and still harm people if it is designed without consent or accountability.',
        ],
      },
      {
        title: 'Think like a defender: assets, threats, controls',
        paragraphs: [
          'A threat model is a structured way to answer three questions: what are we protecting, who might attack it, and what would reduce the risk? The asset might be customer records, a build pipeline or the ability to dispatch emergency services. The threat could be a criminal group, a careless insider or simply a failing disk.',
          'Controls are the countermeasures you choose: patching, least privilege, logging, segmentation, training, backups. No control is free, so a good threat model also names the trade-off. Stronger verification can slow users down; more logging can create privacy risk. Security work is the craft of making those trade-offs explicit.',
        ],
        bullets: [
          'Inventory: you cannot protect what you do not know exists.',
          'Least privilege: give every identity only the access it needs.',
          'Assume breach: design so one stolen credential is not game over.',
          'Verify recovery: a backup is not real until you have restored it.',
        ],
      },
      {
        title: 'Your first practical habit',
        paragraphs: [
          'Start with the account you use most. Turn on multi-factor authentication, update the password to a unique passphrase stored in a password manager, and review active sessions. These three actions remove a surprising number of realistic attack paths.',
          'Security is a practice of incremental improvement. You do not need to secure everything today. You need to know what matters most, what is most exposed, and what you will improve next.',
        ],
      },
    ],
    takeaways: [
      'Cybersecurity protects confidentiality, integrity and availability through layered controls.',
      'Threat modeling connects assets to realistic threats and proportionate defenses.',
      'Basic account hygiene — MFA, unique passwords, session review — has outsized impact.',
      'Security is continuous maintenance, not a one-time installation.',
    ],
  },
  {
    slug: 'what-is-an-ip-address',
    title: 'What is an IP address?',
    excerpt:
      'IP addresses are the postal system of the internet. Learn how IPv4 and IPv6 identify devices, what public and private ranges mean, and why an address is not a person.',
    category: 'Networking',
    level: 'Beginner',
    minutes: 6,
    updated: '2026-02-15',
    relatedCourse: 'networking-essentials',
    sections: [
      {
        title: 'An address for a network interface',
        paragraphs: [
          'An Internet Protocol (IP) address is a number assigned to a network interface so packets can be delivered to it. Think of it as a postal address: it tells routers where a packet should go, not who owns the device or which human is using it.',
          'IPv4 addresses are 32 bits long and usually written as four decimal octets, such as 192.0.2.10. IPv6 addresses are 128 bits and written in hexadecimal, such as 2001:db8:85a3::8a2e:370:7334. IPv6 exists because the world ran out of fresh IPv4 addresses.',
        ],
        code: {
          label: 'Address notation',
          content: `IPv4   192.0.2.10
IPv6   2001:db8:85a3::8a2e:370:7334

Private IPv4 ranges
10.0.0.0/8
172.16.0.0/12
192.168.0.0/16`,
        },
      },
      {
        title: 'Public, private and loopback',
        paragraphs: [
          'Public addresses are globally routable on the internet. Private addresses are reserved for local networks and are not forwarded across the public internet. Your home router typically translates many private addresses to one public address using NAT, or Network Address Translation.',
          'The loopback address — 127.0.0.1 in IPv4 and ::1 in IPv6 — refers to the local machine itself. When a developer runs a server on localhost, it is reachable only from that machine unless it is explicitly bound to another interface.',
        ],
        bullets: [
          'Public: reachable across the internet, assigned by an ISP or cloud provider.',
          'Private: used inside homes, offices and virtual networks.',
          'Loopback: the device talking to itself.',
          'Link-local: automatically assigned for local discovery, such as 169.254.0.0/16.',
        ],
      },
      {
        title: 'What an IP address can and cannot tell you',
        paragraphs: [
          'An IP address identifies an interface at a point in time. It can help route traffic, block abusive sources or approximate a geographic region. It does not reliably identify a person. A household, office, mobile carrier or VPN provider may share one public address among thousands of users.',
          'This is why “we have their IP” is not the same as “we know who they are.” Investigators correlate addresses with subscriber records, timestamps and other evidence under legal process. For ordinary users, the practical consequence is simple: an IP address is sensitive metadata, but it is not a name tag.',
        ],
      },
      {
        title: 'Everyday implications',
        paragraphs: [
          'When you troubleshoot a connection, check whether you have a valid address, whether you can reach the gateway, and whether name resolution works. Those three layers solve many home-network problems before you need to reset anything.',
          'When you design a service, avoid exposing databases directly to the public internet. Put them behind private networking and a controlled entry point. Address design is not glamorous, but it is one of the cheapest security improvements available.',
        ],
      },
    ],
    takeaways: [
      'An IP address identifies a network interface, not a human being.',
      'IPv4 uses 32-bit addresses; IPv6 uses 128-bit addresses.',
      'Private ranges are not directly routable on the public internet.',
      'NAT lets many private devices share a single public address.',
    ],
  },
  {
    slug: 'how-dns-works',
    title: 'How does DNS work?',
    excerpt:
      'The Domain Name System turns memorable names into IP addresses. Follow a query from browser cache to root server, and see why DNS is both essential and a favorite target.',
    category: 'Networking',
    level: 'Beginner',
    minutes: 7,
    updated: '2026-02-18',
    featured: true,
    relatedCourse: 'networking-essentials',
    sections: [
      {
        title: 'The internet’s phone book',
        paragraphs: [
          'DNS, the Domain Name System, translates human-friendly names such as example.com into IP addresses that computers can route to. It is a distributed database: no single server holds every name. Instead, a hierarchy of servers delegates responsibility for different parts of the namespace.',
          'The system is designed for caching and resilience. Answers are stored temporarily at many layers, and the hierarchy can route around failures. That design is why DNS resolves billions of queries quickly while remaining largely invisible to users.',
        ],
      },
      {
        title: 'Following a query',
        paragraphs: [
          'When you type a domain into a browser, the browser checks its own cache, then the operating system cache, then a recursive resolver — often operated by your ISP, your network or a public provider. If the resolver does not have a cached answer, it walks the hierarchy.',
          'The resolver asks a root server where the .com zone lives, then asks the .com nameserver which nameservers are authoritative for example.com, then asks the authoritative server for the actual record. The answer is cached according to its TTL, or time to live, so future requests are much faster.',
        ],
        code: {
          label: 'Inspect DNS from a terminal',
          content: `# Query the default resolver
nslookup example.com

# Ask a specific public resolver
nslookup example.com 1.1.1.1

# Detailed query with dig
dig example.com A +short
dig example.com MX

# Trace the delegation path
dig +trace example.com`,
        },
      },
      {
        title: 'Common record types',
        paragraphs: [
          'DNS is more than addresses. Different record types publish different facts about a domain. Understanding the common ones helps you read configuration, diagnose email problems and spot suspicious infrastructure.',
        ],
        bullets: [
          'A — maps a name to an IPv4 address.',
          'AAAA — maps a name to an IPv6 address.',
          'CNAME — aliases one name to another name.',
          'MX — identifies mail servers for a domain.',
          'TXT — holds arbitrary text, including email-security policies such as SPF and DMARC.',
          'NS — lists the authoritative nameservers for a zone.',
        ],
      },
      {
        title: 'Why DNS is a security topic',
        paragraphs: [
          'DNS was not designed with authentication as a priority. An attacker who can control a resolver or spoof a response can redirect users to a lookalike site without changing the URL they typed. DNSSEC adds cryptographic signatures to records, but adoption is uneven and it does not encrypt queries.',
          'DNS is also a rich source of telemetry. Security teams monitor unusual query patterns, newly registered domains and high-entropy subdomains that may indicate malware command-and-control. Encrypted DNS, such as DNS over HTTPS, improves privacy but complicates local inspection — a real trade-off rather than a simple win.',
        ],
      },
    ],
    takeaways: [
      'DNS is a distributed, hierarchical name-to-address lookup system.',
      'Recursive resolvers cache answers based on TTL values.',
      'A, AAAA, CNAME, MX, TXT and NS records publish different kinds of data.',
      'DNS has privacy and integrity weaknesses; DNSSEC and encrypted DNS address different parts of the problem.',
    ],
  },
  {
    slug: 'what-is-a-vpn',
    title: 'What is a VPN?',
    excerpt:
      'A VPN creates an encrypted tunnel between your device and another network. Learn what it hides, what it does not hide, and how to evaluate a provider without the marketing.',
    category: 'Networking',
    level: 'Beginner',
    minutes: 6,
    updated: '2026-02-20',
    relatedCourse: 'networking-essentials',
    sections: [
      {
        title: 'A tunnel, not a cloak of invisibility',
        paragraphs: [
          'A virtual private network extends a private network across a public one. Your device encrypts traffic and sends it to a VPN gateway. The gateway decrypts the traffic and forwards it to the destination. From the outside, observers see an encrypted connection between you and the gateway, not the sites you visit.',
          'The tunnel protects traffic between your device and the VPN server. It also changes the apparent source address seen by destinations, because your traffic exits from the gateway. That is why VPNs can help on untrusted Wi-Fi: a local observer cannot easily read or tamper with your traffic.',
        ],
      },
      {
        title: 'What a VPN hides — and what it does not',
        paragraphs: [
          'A VPN hides your traffic content and original IP address from the local network and from destinations that only see the gateway. It does not make you anonymous. The VPN provider can often see your traffic, your account is tied to payment or login data, browser fingerprinting still works, and sites can correlate you across sessions.',
          'A VPN also does not stop phishing, malware or account takeover. It is a transport-privacy tool, not an antivirus. If you log into a compromised site through a tunnel, the compromise still happens.',
        ],
        bullets: [
          'Hides: local network observers seeing destinations and content.',
          'Changes: the public IP address destinations associate with you.',
          'Does not hide: your identity from the VPN provider, browser fingerprints, or logged-in accounts.',
          'Does not fix: malicious sites, weak passwords or outdated software.',
        ],
      },
      {
        title: 'When a VPN is genuinely useful',
        paragraphs: [
          'Use a VPN on public Wi-Fi when you cannot rely on the network, when you need to reach a private corporate or home network, or when a service is unavailable from your region for legitimate reasons. Choose providers with clear ownership, independent audits, a published privacy policy and a transparent incident history.',
          'Avoid “lifetime free” services with vague ownership. Operating a VPN costs money; if you are not paying, the business model may be advertising, data brokerage or something worse. Self-hosting is a valid option for technically comfortable users, but it shifts the operational burden to you.',
        ],
      },
      {
        title: 'VPN versus Tor versus HTTPS',
        paragraphs: [
          'HTTPS encrypts traffic between your browser and a specific website. A VPN encrypts traffic between your device and a VPN gateway. Tor routes traffic through three relays and is designed for stronger anonymity, at the cost of speed and usability. These tools solve different problems and can be combined, but none is a universal privacy solution.',
          'A useful rule: use HTTPS always, use a VPN when the network or location requires it, and use Tor when anonymity against network-level adversaries is the actual goal. Match the tool to the threat model.',
        ],
      },
    ],
    takeaways: [
      'A VPN encrypts traffic between your device and a VPN gateway.',
      'It changes your apparent IP address but does not make you anonymous.',
      'VPNs do not prevent phishing, malware or account compromise.',
      'Provider ownership, audits and business model matter more than speed claims.',
    ],
  },
  {
    slug: 'what-is-phishing',
    title: 'What is phishing?',
    excerpt:
      'Phishing tricks people into handing over access. Learn the mechanics of deceptive messages, the red flags that survive good design, and how to respond when you click.',
    category: 'Threats',
    level: 'Beginner',
    minutes: 8,
    updated: '2026-02-22',
    featured: true,
    relatedCourse: 'ethical-hacking-basics',
    sections: [
      {
        title: 'Attacking the human interface',
        paragraphs: [
          'Phishing is a social-engineering attack that impersonates a trusted entity to induce an action: opening an attachment, following a link, approving a payment or revealing a credential. It targets people because people are authorized to do things. A perfect firewall does not help if an employee willingly signs into a fake portal.',
          'Phishing arrives through email, SMS (smishing), voice calls (vishing), chat apps and even physical letters. Modern campaigns are often tailored using public information: a real project name, a manager’s writing style, an upcoming conference. This targeting is called spear phishing.',
        ],
      },
      {
        title: 'Anatomy of a campaign',
        paragraphs: [
          'Most campaigns follow a simple chain: a pretext creates urgency or curiosity, a channel delivers a lure, a landing page or attachment captures the action, and the attacker uses the result. A credential phish may proxy the real login page so that even multi-factor authentication can be relayed in real time.',
          'The URL is often the weakest point for the attacker and the strongest signal for the defender. Display text can say anything; the actual domain is harder to fake convincingly. Hover or long-press a link before tapping, and read the domain from right to left: the registered domain is the part immediately before the top-level domain.',
        ],
        bullets: [
          'Urgency: “Your account will be closed in 24 hours.”',
          'Authority: a familiar brand, executive or government agency.',
          'Secrecy: “Do not discuss this with anyone.”',
          'Unexpected attachment or QR code.',
          'A login page reached from a message, asking you to re-enter a password.',
          'A domain that is similar but not identical to the real one.',
        ],
      },
      {
        title: 'Why “just be careful” is not enough',
        paragraphs: [
          'Awareness helps, but it is not a control you can rely on alone. People are tired, busy and trained by constant notifications to click. Organizations reduce phishing risk by combining training with technical controls: phishing-resistant authentication, email authentication (SPF, DKIM, DMARC), link isolation, attachment sandboxing and a one-click reporting path.',
          'Phishing-resistant MFA — such as passkeys or hardware security keys — is especially important. A one-time code can be relayed by a real-time phishing proxy. A cryptographic credential bound to the legitimate origin cannot be replayed on a lookalike site.',
        ],
      },
      {
        title: 'If you clicked',
        paragraphs: [
          'Do not panic, and do not hide it. Speed matters more than blame. Disconnect from the network if malware is suspected, change the compromised password from a different device, revoke active sessions, and report the message to your security team. If you entered payment details, contact the bank immediately.',
          'Report the original message rather than forwarding it, so headers remain intact. Security teams use those headers to find other recipients and block the campaign. Your quick report may protect dozens of colleagues.',
        ],
      },
    ],
    takeaways: [
      'Phishing exploits human trust and authority, not just technical flaws.',
      'Check the actual domain, not the display text or sender name.',
      'Phishing-resistant MFA is stronger than codes that can be relayed.',
      'Report quickly and revoke sessions after a suspected compromise.',
    ],
  },
  {
    slug: 'what-is-ddos',
    title: 'What is DDoS?',
    excerpt:
      'Distributed denial-of-service attacks try to exhaust a target’s capacity. Understand volumetric, protocol and application-layer attacks, and the layered defenses that actually help.',
    category: 'Threats',
    level: 'Intermediate',
    minutes: 7,
    updated: '2026-02-24',
    relatedCourse: 'networking-essentials',
    sections: [
      {
        title: 'Denial of service, distributed',
        paragraphs: [
          'A denial-of-service (DoS) attack makes a service unavailable to legitimate users by exhausting a resource: bandwidth, connection tables, CPU, memory or application workers. A distributed denial-of-service (DDoS) attack uses many sources — often compromised devices, servers or cloud accounts — so the traffic cannot be filtered by blocking a single address.',
          'DDoS is an availability attack. It does not usually steal data. Its goals can be extortion, distraction from another intrusion, competitor sabotage or protest. For the defender, the defining constraint is asymmetry: a small attacker investment can require a large defensive response.',
        ],
      },
      {
        title: 'Three broad layers',
        paragraphs: [
          'Volumetric attacks flood the network with traffic, measured in bits per second. Large reflection and amplification attacks, such as DNS or NTP amplification, belong here. Protocol attacks exhaust state in network equipment or servers, for example through SYN floods. Application-layer attacks target the logic of a web application with expensive requests that look legitimate.',
          'Application-layer attacks are often small in bandwidth but expensive per request: a search endpoint that triggers a database scan, a login page with costly password hashing, or an API that generates a PDF. Because each request resembles normal traffic, signatures and simple rate limits may miss them.',
        ],
        bullets: [
          'Volumetric — saturate bandwidth (Gbps/Tbps).',
          'Protocol — exhaust connection state (SYN flood, fragmented packets).',
          'Application — exhaust business logic and workers (HTTP floods, expensive queries).',
          'Reflection/amplification — spoof the victim’s address and multiply traffic through open services.',
        ],
      },
      {
        title: 'Defense in layers',
        paragraphs: [
          'No single appliance stops every DDoS. Effective defense starts before an attack: know normal traffic baselines, keep capacity and architecture documented, use a CDN or scrubbing provider for internet-facing services, and have an incident playbook with contact details that do not depend on the affected network.',
          'During an attack, defenders shift traffic through scrubbing capacity, apply rate limits and caching, block clearly malicious patterns and degrade non-essential features to protect core functions. Post-incident work is just as important: quantify the attack, identify exposed dependencies and adjust thresholds so legitimate users are not caught in the response.',
        ],
      },
      {
        title: 'Ethics and the law',
        paragraphs: [
          'Launching a DDoS attack is illegal in most jurisdictions and harmful regardless of intent. Stress-testing services is legitimate only with explicit written authorization, a defined scope and a controlled environment. “We were testing our own resilience” is not a defense when the target did not consent.',
          'As a learner, study DDoS through simulation and tabletop exercises. Read provider postmortems, analyze traffic traces from public datasets, and practice writing a response plan. Understanding the attack is valuable; performing it on someone else’s service is not education.',
        ],
      },
    ],
    takeaways: [
      'DDoS attacks exhaust availability rather than stealing data.',
      'Volumetric, protocol and application-layer attacks require different defenses.',
      'Caching, rate limiting, scrubbing and a rehearsed playbook reduce impact.',
      'Testing is lawful only with explicit, written authorization and a defined scope.',
    ],
  },
  {
    slug: 'social-engineering',
    title: 'What is social engineering?',
    excerpt:
      'Social engineering manipulates people into breaking normal security procedures. Learn the psychological levers, classic pretexts and the verification habits that defeat them.',
    category: 'Threats',
    level: 'Beginner',
    minutes: 7,
    updated: '2026-02-26',
    relatedCourse: 'ethical-hacking-basics',
    sections: [
      {
        title: 'Exploiting normal human behavior',
        paragraphs: [
          'Social engineering is the use of deception to influence someone into taking an action or revealing information. It is not a hack of a computer; it is a hack of a process that relies on trust. Helpful people, clear hierarchies and fast response times are organizational strengths — and an attacker can turn each into a lever.',
          'Common levers include authority (“I’m calling from IT”), urgency (“the CEO needs this now”), reciprocity (“I helped you yesterday”), social proof (“everyone else already approved it”) and fear of consequences. A skilled pretext makes the request feel routine rather than suspicious.',
        ],
      },
      {
        title: 'Classic pretexts',
        paragraphs: [
          'An attacker may pose as a new employee who needs access, a vendor updating billing details, a help-desk technician resolving a ticket, or an auditor collecting evidence. Each story is plausible because it maps to a real workflow. The goal is often small: one password reset, one file opened, one payment redirected.',
          'Business email compromise (BEC) is a high-impact example. Instead of malware, the attacker uses a convincing email thread to change a bank account or authorize a transfer. Losses can be enormous because the request arrives through a trusted channel and follows a familiar process.',
        ],
        bullets: [
          'Pretexting — inventing a scenario that justifies the request.',
          'Baiting — offering something desirable, such as a free file or gift card.',
          'Tailgating — following an authorized person into a restricted space.',
          'Quid pro quo — offering help in exchange for access or information.',
          'Vishing — using a phone call to create pressure and immediacy.',
        ],
      },
      {
        title: 'Verification is the control',
        paragraphs: [
          'The most reliable defense is an out-of-band verification step: confirm the request through a separate, known channel. If someone emails to change payment details, call the vendor using a number from your own records, not the number in the email. If IT calls asking for a password, hang up and call the help desk yourself.',
          'Strong processes make verification normal rather than accusatory. A payment-change policy that always requires a second approver is easier to follow than asking an employee to challenge a senior colleague in the moment. Design controls so that saying “let me verify” is routine.',
        ],
      },
      {
        title: 'A practical checklist',
        paragraphs: [
          'Slow down when a message creates urgency, requests secrecy or asks you to bypass a normal step. Check the sender’s full address and the real destination of links. Never share passwords or one-time codes; legitimate support staff do not need them. For sensitive changes, verify through a channel you initiate.',
          'If you realize you have been manipulated, report it immediately. Social engineering relies on embarrassment and silence. A culture that rewards fast reporting removes the attacker’s biggest advantage.',
        ],
      },
    ],
    takeaways: [
      'Social engineering exploits trust, authority and urgency rather than technical flaws.',
      'Use out-of-band verification for payments, access and sensitive data.',
      'Normalize “let me verify” in organizational processes.',
      'Fast, blame-free reporting limits damage and protects others.',
    ],
  },
  {
    slug: 'linux-fundamentals',
    title: 'Linux fundamentals for security',
    excerpt:
      'A guided tour of the Linux shell: navigation, files, permissions, processes and the commands security practitioners use every day.',
    category: 'Linux',
    level: 'Beginner',
    minutes: 9,
    updated: '2026-03-01',
    featured: true,
    relatedCourse: 'linux-fundamentals',
    sections: [
      {
        title: 'The shell is an interface to the system',
        paragraphs: [
          'Linux is a family of open-source operating systems built around the Linux kernel. It runs most internet servers, many Android devices and a large share of cloud infrastructure. For security work, Linux matters because it is where logs live, where services run and where automation happens.',
          'The shell is a text interface to the operating system. You type a command, the shell finds the program, runs it with arguments and shows the output. Most commands are small programs that do one job well, which is why they can be combined with pipes.',
        ],
        code: {
          label: 'Navigate and inspect',
          content: `pwd                  # print working directory
ls -la               # list all files with details
cd /var/log          # change directory
cat auth.log         # print a file
less auth.log        # scroll through a file
head -n 20 auth.log  # first 20 lines
tail -f auth.log     # follow new lines live`,
        },
      },
      {
        title: 'Everything is a file',
        paragraphs: [
          'Linux exposes many system resources through the filesystem. Devices appear under /dev, running process details under /proc, and configuration under /etc. This uniformity is powerful: once you understand files, paths and permissions, you can reason about a lot of the system.',
          'The root of the hierarchy is /. Common directories include /home for user files, /etc for configuration, /var for changing data such as logs, /tmp for temporary files, and /usr for installed programs and libraries. You do not need to memorize every path, but knowing where to look is half the skill.',
        ],
        bullets: [
          '/etc — system-wide configuration, including /etc/passwd and /etc/ssh.',
          '/var/log — logs for services and the kernel.',
          '/home — user home directories.',
          '/tmp — temporary files; often world-writable, never a safe place for secrets.',
          '/proc — live kernel and process information.',
        ],
      },
      {
        title: 'Permissions and ownership',
        paragraphs: [
          'Every file has an owner, a group and a permission mode. The mode expresses read (r), write (w) and execute (x) for the owner, group and others. The command ls -l displays these as a string such as -rw-r--r--, followed by owner and group.',
          'Security problems often come from permissions that are too broad. A private key readable by everyone (mode 644) is effectively public. A service running as root has far more access than it needs. Least privilege means running each process as a dedicated user with only the files and capabilities it requires.',
        ],
        code: {
          label: 'Permission basics',
          content: `ls -l
-rw-r--r--  1 alice devs  1200 Mar  2 10:10 notes.txt

chmod 600 ~/.ssh/id_ed25519   # owner read/write only
chmod 755 deploy.sh           # owner rwx, others rx
chown alice:devs file.txt     # change owner and group

# Inspect your identity and groups
id
whoami`,
        },
      },
      {
        title: 'Processes, services and logs',
        paragraphs: [
          'A process is a running program with an ID (PID). Commands such as ps, top and pgrep show what is running. Services on modern Linux are usually managed by systemd, with systemctl status and journalctl providing a consistent way to inspect them.',
          'Logs are evidence. Start with journalctl for systemd services and /var/log for application or authentication records. Learn to filter with grep and follow with tail -f. On a real investigation, timestamps, users and source addresses tell the story — but verify timestamps are in the timezone you think they are.',
        ],
        code: {
          label: 'Processes and logs',
          content: `ps aux | grep ssh
systemctl status ssh
journalctl -u ssh --since "1 hour ago"
grep "Failed password" /var/log/auth.log
ss -tulpn                 # listening sockets
df -h && free -h          # disk and memory`,
        },
      },
      {
        title: 'Practice safely',
        paragraphs: [
          'Install a virtual machine or use a container to experiment. Take a snapshot before changing permissions or services. Do not practice destructive commands on a system you rely on, and never run commands you do not understand simply because a tutorial says so.',
          'Read the manual: man ls, man chmod, man journalctl. The manual is the most underrated security tool on the system. It tells you exactly what a command does, which is the first step toward using it responsibly.',
        ],
      },
    ],
    takeaways: [
      'The shell composes small commands; pipes are the superpower.',
      'Linux exposes much of its state through the filesystem.',
      'Least privilege applies to file modes and service accounts.',
      'journalctl, systemctl and log files are the starting point for investigation.',
    ],
  },
  {
    slug: 'what-is-sql',
    title: 'What is SQL?',
    excerpt:
      'SQL is the language of relational databases. Learn how queries work, why injection is still dangerous, and how parameterized queries close the gap.',
    category: 'Web Security',
    level: 'Beginner',
    minutes: 8,
    updated: '2026-03-04',
    relatedCourse: 'web-security-fundamentals',
    sections: [
      {
        title: 'A language for structured data',
        paragraphs: [
          'SQL, Structured Query Language, is used to create, read, update and delete data in relational databases. Tables have rows and columns; relationships connect tables through keys. SQL lets applications ask precise questions such as “which orders belong to this customer and were placed this week?”',
          'PostgreSQL, MySQL, SQLite and SQL Server are common implementations. They share a core syntax but differ in advanced features. Learning the core — SELECT, WHERE, JOIN, GROUP BY and indexes — transfers well between them.',
        ],
        code: {
          label: 'A safe read query',
          content: `SELECT id, email, created_at
FROM users
WHERE team_id = $1
  AND created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC
LIMIT 50;`,
        },
      },
      {
        title: 'From tables to answers',
        paragraphs: [
          'A SELECT statement describes the shape of the result. FROM names the table, WHERE filters rows, JOIN combines related tables, GROUP BY aggregates and ORDER BY sorts. An index can make a filter fast by letting the database find rows without scanning the entire table.',
          'Data modeling matters for security as well as performance. If every table stores everything, a single injection or misconfiguration exposes more than necessary. Separate sensitive data, limit retention, and grant the application only the database privileges it actually uses.',
        ],
        bullets: [
          'SELECT — choose columns and rows.',
          'INSERT / UPDATE / DELETE — change data; always scope with WHERE.',
          'JOIN — combine rows from related tables.',
          'GRANT / REVOKE — control database privileges.',
          'Transactions — apply a group of changes atomically.',
        ],
      },
      {
        title: 'SQL injection, explained',
        paragraphs: [
          'SQL injection occurs when untrusted input is concatenated into a query, allowing an attacker to change the query’s structure. A login form that builds “SELECT * FROM users WHERE email = \'” + input + “\'” can be manipulated with a quote and additional SQL. The database cannot tell which part was intended as data.',
          'The durable fix is parameterized queries, also called prepared statements. The query template is sent separately from the values, so the database treats values as data, never as SQL syntax. Input validation helps, but it is not a substitute. Escaping by hand is fragile and easy to get wrong.',
        ],
        code: {
          label: 'Vulnerable vs. parameterized',
          content: `// Vulnerable: user input becomes SQL syntax
db.query("SELECT * FROM users WHERE email = '" + email + "'");

// Safe: value is bound as a parameter
db.query('SELECT * FROM users WHERE email = $1', [email]);`,
        },
      },
      {
        title: 'Defense beyond the query',
        paragraphs: [
          'Use least-privilege database accounts: the public web application usually does not need permission to drop tables or read every schema. Keep database servers off the public internet. Validate data types at the application boundary, log failures without logging secrets, and patch the database engine.',
          'For learners, practice with a local database and a deliberately vulnerable lab. Never test injection against a site you do not own. The skill is valuable; unauthorized access is a crime and a betrayal of the ethics this platform teaches.',
        ],
      },
    ],
    takeaways: [
      'SQL is a declarative language for querying relational data.',
      'SQL injection turns untrusted input into executable query structure.',
      'Parameterized queries are the primary defense, not string escaping.',
      'Least privilege and network isolation reduce the blast radius.',
    ],
  },
  {
    slug: 'two-factor-authentication',
    title: 'What is two-factor authentication?',
    excerpt:
      '2FA adds a second proof of identity beyond a password. Compare SMS, authenticator apps, push prompts and passkeys — and understand why not all factors are equal.',
    category: 'Identity',
    level: 'Beginner',
    minutes: 6,
    updated: '2026-03-06',
    relatedCourse: 'introduction-to-cybersecurity',
    sections: [
      {
        title: 'Something you know, have or are',
        paragraphs: [
          'Authentication answers “who are you?” A factor is a category of evidence. Something you know includes a password or PIN. Something you have includes a phone, hardware key or smart card. Something you are includes a fingerprint or face. Two-factor authentication (2FA) combines evidence from at least two different categories.',
          'Requiring two passwords is not 2FA, because both are the same category and can be stolen together. Real 2FA raises the cost of account takeover: a password alone is no longer enough, even if it leaks in a breach.',
        ],
      },
      {
        title: 'The spectrum of second factors',
        paragraphs: [
          'SMS codes are better than nothing and widely available, but they are vulnerable to SIM swapping, interception and phishing relays. Authenticator apps generate time-based codes locally and avoid telecom weaknesses, though a user can still be tricked into typing a code into a fake site. Push notifications are convenient but can lead to “MFA fatigue” — repeated prompts until someone approves.',
          'Hardware security keys and passkeys are phishing-resistant. They use public-key cryptography bound to the legitimate website’s origin, so a credential created for your bank cannot be replayed on a lookalike domain. This is why security teams increasingly prefer them for high-value accounts.',
        ],
        bullets: [
          'SMS / voice codes — convenient, weakest against determined attackers.',
          'Authenticator apps (TOTP) — offline codes, still replayable through real-time phishing.',
          'Push prompts — easy to use, but vulnerable to fatigue and accidental approval.',
          'Hardware keys / passkeys — strongest widely available option.',
          'Recovery codes — essential backup; store them offline.',
        ],
      },
      {
        title: 'Make 2FA actually resilient',
        paragraphs: [
          'Enable 2FA on your email account first; it is the recovery route for almost everything else. Then protect banking, password manager and work accounts. Register more than one factor where possible, such as two hardware keys or a key plus an authenticator app, and store recovery codes somewhere offline and durable.',
          'Review trusted devices and active sessions periodically. If a service supports passkeys, use them. If you receive an authentication prompt you did not initiate, do not approve it: someone already has your password. Deny the prompt, change the password and revoke sessions.',
        ],
      },
      {
        title: 'The limits of 2FA',
        paragraphs: [
          '2FA protects authentication, not the session after login. Malware that steals cookies, a compromised OAuth token or an attacker who convinces support to reset your account can still succeed. Session lifetime, device binding and monitoring remain important.',
          'Recovery is part of the security model. A support desk that resets MFA after a friendly phone call weakens every strong factor you deployed. Good 2FA design includes a secure recovery process, not just a prompt at login.',
        ],
      },
    ],
    takeaways: [
      '2FA must combine different factor categories.',
      'Passkeys and hardware keys resist phishing; codes can be relayed.',
      'Protect email first and store recovery codes offline.',
      'Never approve an authentication prompt you did not initiate.',
    ],
  },
  {
    slug: 'how-encryption-works',
    title: 'How does encryption work?',
    excerpt:
      'Encryption turns readable data into ciphertext using a key. Explore symmetric and asymmetric cryptography, TLS handshakes and the difference between encryption and hashing.',
    category: 'Cryptography',
    level: 'Intermediate',
    minutes: 9,
    updated: '2026-03-09',
    featured: true,
    relatedCourse: 'introduction-to-cybersecurity',
    sections: [
      {
        title: 'Scrambling with a purpose',
        paragraphs: [
          'Encryption is a reversible transformation: plaintext plus a key becomes ciphertext, and the right key turns it back. Without the key, the ciphertext should reveal nothing useful. Modern encryption relies on well-studied algorithms such as AES for symmetric encryption and RSA or elliptic-curve cryptography for key exchange and signatures.',
          'The goal is confidentiality, not secrecy of the algorithm. Kerckhoffs’s principle says a system should remain secure even if everything about it except the key is public. Open, audited algorithms are stronger than homemade ciphers because experts have spent years trying to break them.',
        ],
      },
      {
        title: 'Symmetric and asymmetric keys',
        paragraphs: [
          'Symmetric encryption uses one shared key for both encryption and decryption. It is fast and ideal for bulk data. The hard part is distributing the key securely: if the sender and receiver are far apart, how do they agree on a secret?',
          'Asymmetric encryption uses a key pair. The public key can be shared openly; the private key stays secret. Anyone can encrypt a message to you with your public key, and only your private key can decrypt it. Asymmetric operations are slower, so real protocols combine both: asymmetric key exchange establishes a shared symmetric key, then fast symmetric encryption protects the data.',
        ],
        code: {
          label: 'The TLS pattern',
          content: `1. Client and server agree on protocol parameters.
2. They perform a key exchange using asymmetric cryptography.
3. Both derive the same short-lived symmetric session key.
4. Bulk traffic is encrypted with that session key.
5. Certificates bind the server's public key to its domain name.`,
        },
      },
      {
        title: 'Encryption is not hashing',
        paragraphs: [
          'Hashing is one-way. A hash function turns any input into a fixed-length digest, and you cannot recover the original input from the digest. Hashes are used for integrity checks and password storage. Passwords should be stored with a slow, salted password-hashing function such as Argon2id, bcrypt or scrypt — never with a general-purpose hash like MD5 or SHA-1.',
          'Encryption protects data you need to read later. Hashing lets you verify data without storing the original. Digital signatures combine hashing with asymmetric keys to prove authenticity and integrity. Each primitive solves a different problem, and mixing them up creates real vulnerabilities.',
        ],
      },
      {
        title: 'TLS in one page',
        paragraphs: [
          'HTTPS uses TLS to provide confidentiality, integrity and server authentication. During the handshake, the server presents a certificate. The client verifies that the certificate chains to a trusted authority, that the name matches and that it has not expired or been revoked. Then both sides derive session keys.',
          'TLS protects data in transit, not data on disk. Encrypting a database, a backup or a laptop requires separate at-rest encryption. Good security uses both: traffic encryption and storage encryption, each with independent key management and rotation.',
        ],
        bullets: [
          'Use TLS 1.2 or 1.3; disable obsolete protocol versions.',
          'Never disable certificate validation to “make it work”.',
          'Rotate keys and have a plan for compromise.',
          'Encrypt backups and test that restoration still works.',
        ],
      },
      {
        title: 'Where cryptography fails',
        paragraphs: [
          'Most failures are not broken math. They are implementation mistakes: reused nonces, weak random number generators, insecure key storage, missing certificate checks, or an unencrypted backup left beside the encrypted database. Cryptography is a sharp tool; using it correctly requires discipline.',
          'Do not invent your own encryption scheme. Use vetted libraries, follow their documentation and have a professional review high-risk designs. The goal is not to be clever; it is to be correct.',
        ],
      },
    ],
    takeaways: [
      'Encryption is reversible with a key; hashing is one-way.',
      'TLS combines asymmetric key exchange with fast symmetric encryption.',
      'Password storage requires slow, salted hashing such as Argon2id.',
      'Implementation and key management fail more often than algorithms.',
    ],
  },
  {
    slug: 'what-is-malware',
    title: 'What is malware?',
    excerpt:
      'Malware is software designed to cause harm. Survey viruses, worms, trojans, ransomware and spyware — and the practical defenses that reduce your exposure.',
    category: 'Threats',
    level: 'Beginner',
    minutes: 7,
    updated: '2026-03-12',
    relatedCourse: 'ethical-hacking-basics',
    sections: [
      {
        title: 'A category, not a single technique',
        paragraphs: [
          'Malware is any software intentionally designed to disrupt, damage, gain unauthorized access or collect information. The label covers many behaviors and delivery methods. A single sample may combine several categories, which is why defenders focus on behavior and indicators rather than names.',
          'Malware often arrives through phishing attachments, malicious downloads, compromised update channels, exposed services or USB devices. It may execute immediately or wait for a trigger. Modern campaigns frequently use legitimate tools already present on the system — “living off the land” — to blend in.',
        ],
      },
      {
        title: 'The main families',
        paragraphs: [
          'A virus attaches to a host file and spreads when the host runs. A worm spreads by itself across networks without user action. A trojan disguises itself as legitimate software. Ransomware encrypts or steals data and demands payment. Spyware covertly monitors activity, while a keylogger records keystrokes. Rootkits hide deep in the system; botnets turn infected devices into remote-controlled armies.',
          'These categories overlap. Ransomware operators often use a trojan for initial access and stolen credentials to move laterally. An infection is usually a chain, not a single moment.',
        ],
        bullets: [
          'Virus — infects files and spreads when they execute.',
          'Worm — self-propagates across networks.',
          'Trojan — masquerades as legitimate software.',
          'Ransomware — encrypts data and demands payment.',
          'Spyware / keylogger — secretly collects information.',
          'Botnet — remotely controlled network of infected hosts.',
        ],
      },
      {
        title: 'How infections begin',
        paragraphs: [
          'The most common initial access vectors are phishing, stolen credentials, unpatched internet-facing services and malicious downloads. Attackers do not need zero-day exploits if a known vulnerability remains unpatched or an employee can be persuaded to run an attachment. Supply-chain attacks are particularly dangerous because they compromise software before it reaches the victim.',
          'Macro-enabled documents, fake installers, cracked software and browser extensions are recurring delivery mechanisms. “Free” software from unofficial sources often carries a hidden cost. Verify publishers, check signatures where possible and download from official sources.',
        ],
      },
      {
        title: 'Defenses that reduce real risk',
        paragraphs: [
          'Patch operating systems, browsers and server software promptly. Use endpoint protection that is actually monitored, disable macros by default, restrict local administrator rights, and segment networks so one infected machine cannot reach everything. Keep offline or immutable backups and test restoration.',
          'For individuals: update automatically, install apps from official stores, use a password manager, enable MFA, and be skeptical of unexpected attachments. If a device slows down, displays unusual ads or runs unexplained processes, investigate rather than ignore it. Rebuilding from a known-good state is often safer than trying to clean a deeply infected machine.',
        ],
      },
      {
        title: 'If you are infected',
        paragraphs: [
          'Disconnect from the network to limit spread, but do not power off immediately if forensic evidence matters. Change credentials from a separate, trusted device. Report to your organization’s security team or, for serious incidents, the relevant authority. Do not pay a ransom without expert guidance; payment funds criminal operations and does not guarantee recovery.',
          'Recovery should include eradication and verification, not just restoration. Find the initial access path, close it and monitor for reinfection. If the same vulnerability remains, the attacker will return.',
        ],
      },
    ],
    takeaways: [
      'Malware is defined by intent and behavior, not by one code pattern.',
      'Ransomware, trojans, worms and spyware often combine in one campaign.',
      'Patching, macros-off defaults, least privilege and backups reduce impact.',
      'After infection, remove the initial access path before restoring data.',
    ],
  },
];

export function getTopic(slug: string): Topic | undefined {
  return TOPICS.find((topic) => topic.slug === slug);
}

export function relatedTopics(topic: Topic, count = 3): Topic[] {
  return TOPICS.filter(
    (item) =>
      item.slug !== topic.slug &&
      (item.category === topic.category || item.level === topic.level),
  ).slice(0, count);
}
