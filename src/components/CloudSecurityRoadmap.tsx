import React, { useState, useEffect } from 'react';
import { 
  CheckCircle,
  Circle,
  Lock,
  Shield,
  Cloud,
  Code,
  Server,
  Database,
  Network,
  Terminal,
  BookOpen,
  Award,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Target,
  Zap,
  Timer,
  TrendingUp,
  Star,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Calendar,
  Users,
  FileText,
  GitBranch,
  Cpu,
  Eye,
  AlertTriangle,
  Key
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  category: string;
  estimatedHours: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  prerequisites: string[];
  resources: {
    title: string;
    url: string;
    type: 'course' | 'documentation' | 'tool' | 'certification' | 'practice';
  }[];
  skills: string[];
  completed: boolean;
  inProgress: boolean;
  phase: number;
}

const CloudSecurityRoadmap = () => {
  const { state, dispatch } = useDashboard();
  const [selectedPhase, setSelectedPhase] = useState(1);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [roadmapProgress, setRoadmapProgress] = useState<Record<string, RoadmapItem>>({});
  const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const phases = [
    { id: 1, title: 'Foundation Skills', icon: BookOpen, color: 'from-blue-400 to-cyan-500' },
    { id: 2, title: 'Cloud Fundamentals', icon: Cloud, color: 'from-green-400 to-emerald-500' },
    { id: 3, title: 'Cloud Security', icon: Shield, color: 'from-yellow-400 to-orange-500' },
    { id: 4, title: 'DevOps & CI/CD', icon: GitBranch, color: 'from-purple-400 to-pink-500' },
    { id: 5, title: 'DevSecOps Integration', icon: Lock, color: 'from-red-400 to-rose-500' },
    { id: 6, title: 'Container Security', icon: Server, color: 'from-indigo-400 to-purple-500' },
    { id: 7, title: 'Advanced Architecture', icon: Network, color: 'from-teal-400 to-cyan-500' },
    { id: 8, title: 'Certifications & Portfolio', icon: Award, color: 'from-orange-400 to-red-500' },
    { id: 9, title: 'Continuous Growth', icon: TrendingUp, color: 'from-pink-400 to-rose-500' }
  ];

  const roadmapItems: RoadmapItem[] = [
    // Phase 1: Foundation Skills
    {
      id: 'foundation-os-networking',
      title: 'Operating Systems & Networking',
      description: 'Master Linux systems, TCP/IP, DNS, and HTTP protocols. Build networks in VirtualBox.',
      category: 'Infrastructure',
      estimatedHours: 80,
      difficulty: 'beginner',
      prerequisites: [],
      resources: [
        { title: 'Linux Command Line Basics', url: 'https://linuxcommand.org/', type: 'documentation' },
        { title: 'CompTIA Network+ Study Guide', url: 'https://www.comptia.org/certifications/network', type: 'certification' },
        { title: 'VirtualBox Networking', url: 'https://www.virtualbox.org/manual/ch06.html', type: 'documentation' }
      ],
      skills: ['Linux Administration', 'TCP/IP', 'DNS', 'HTTP/HTTPS', 'Network Troubleshooting'],
      completed: false,
      inProgress: false,
      phase: 1
    },
    {
      id: 'foundation-scripting',
      title: 'Scripting & Programming',
      description: 'Learn Python for automation and Bash for Linux administration.',
      category: 'Development',
      estimatedHours: 60,
      difficulty: 'beginner',
      prerequisites: ['foundation-os-networking'],
      resources: [
        { title: 'Python.org Tutorial', url: 'https://docs.python.org/3/tutorial/', type: 'documentation' },
        { title: 'Bash Scripting Guide', url: 'https://tldp.org/LDP/abs/html/', type: 'documentation' },
        { title: 'Automate the Boring Stuff', url: 'https://automatetheboringstuff.com/', type: 'course' }
      ],
      skills: ['Python', 'Bash Scripting', 'Automation', 'Linux CLI'],
      completed: false,
      inProgress: false,
      phase: 1
    },
    {
      id: 'foundation-security',
      title: 'Security Fundamentals',
      description: 'Understand CIA triad, OWASP Top 10, cryptography basics, and penetration testing tools.',
      category: 'Security',
      estimatedHours: 70,
      difficulty: 'beginner',
      prerequisites: [],
      resources: [
        { title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/', type: 'documentation' },
        { title: 'Kali Linux Tools', url: 'https://www.kali.org/tools/', type: 'tool' },
        { title: 'CompTIA Security+', url: 'https://www.comptia.org/certifications/security', type: 'certification' }
      ],
      skills: ['Security Principles', 'Cryptography', 'Penetration Testing', 'Vulnerability Assessment'],
      completed: false,
      inProgress: false,
      phase: 1
    },

    // Phase 2: Cloud Fundamentals
    {
      id: 'cloud-core-services',
      title: 'Cloud Core Services',
      description: 'Master compute, storage, and networking services across AWS, Azure, or GCP.',
      category: 'Cloud',
      estimatedHours: 100,
      difficulty: 'intermediate',
      prerequisites: ['foundation-os-networking'],
      resources: [
        { title: 'AWS Cloud Practitioner', url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/', type: 'certification' },
        { title: 'Azure Fundamentals AZ-900', url: 'https://docs.microsoft.com/en-us/certifications/azure-fundamentals/', type: 'certification' },
        { title: 'GCP Associate Cloud Engineer', url: 'https://cloud.google.com/certification/cloud-engineer', type: 'certification' }
      ],
      skills: ['AWS/Azure/GCP', 'Virtual Machines', 'Storage Services', 'VPC/VNet', 'Load Balancing'],
      completed: false,
      inProgress: false,
      phase: 2
    },
    {
      id: 'cloud-iac',
      title: 'Infrastructure as Code (IaC)',
      description: 'Learn Terraform and CloudFormation to provision infrastructure repeatably.',
      category: 'DevOps',
      estimatedHours: 80,
      difficulty: 'intermediate',
      prerequisites: ['cloud-core-services', 'foundation-scripting'],
      resources: [
        { title: 'Terraform Documentation', url: 'https://www.terraform.io/docs/', type: 'documentation' },
        { title: 'AWS CloudFormation', url: 'https://aws.amazon.com/cloudformation/', type: 'documentation' },
        { title: 'HashiCorp Terraform Certification', url: 'https://www.hashicorp.com/certification/terraform-associate', type: 'certification' }
      ],
      skills: ['Terraform', 'CloudFormation', 'ARM Templates', 'Infrastructure Automation', 'Version Control'],
      completed: false,
      inProgress: false,
      phase: 2
    },

    // Phase 3: Cloud Security
    {
      id: 'cloud-iam',
      title: 'Identity & Access Management',
      description: 'Implement least-privilege access, roles, policies, and identity federation.',
      category: 'Security',
      estimatedHours: 60,
      difficulty: 'intermediate',
      prerequisites: ['cloud-core-services'],
      resources: [
        { title: 'AWS IAM Best Practices', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html', type: 'documentation' },
        { title: 'Azure Active Directory', url: 'https://docs.microsoft.com/en-us/azure/active-directory/', type: 'documentation' },
        { title: 'Google Cloud IAM', url: 'https://cloud.google.com/iam/docs', type: 'documentation' }
      ],
      skills: ['IAM Policies', 'RBAC', 'Identity Federation', 'Multi-Factor Authentication', 'Least Privilege'],
      completed: false,
      inProgress: false,
      phase: 3
    },
    {
      id: 'cloud-network-security',
      title: 'Cloud Network Security',
      description: 'Secure networks with security groups, NACLs, VPNs, and network segmentation.',
      category: 'Security',
      estimatedHours: 70,
      difficulty: 'intermediate',
      prerequisites: ['cloud-iam'],
      resources: [
        { title: 'AWS VPC Security', url: 'https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Security.html', type: 'documentation' },
        { title: 'Azure Network Security Groups', url: 'https://docs.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview', type: 'documentation' },
        { title: 'GCP Firewall Rules', url: 'https://cloud.google.com/vpc/docs/firewalls', type: 'documentation' }
      ],
      skills: ['Security Groups', 'NACLs', 'VPN Configuration', 'Network Segmentation', 'DDoS Protection'],
      completed: false,
      inProgress: false,
      phase: 3
    },

    // Phase 4: DevOps & CI/CD
    {
      id: 'devops-git-cicd',
      title: 'Version Control & CI/CD',
      description: 'Master Git workflows and implement CI/CD pipelines with GitHub Actions or GitLab CI.',
      category: 'DevOps',
      estimatedHours: 80,
      difficulty: 'intermediate',
      prerequisites: ['foundation-scripting'],
      resources: [
        { title: 'Git Documentation', url: 'https://git-scm.com/doc', type: 'documentation' },
        { title: 'GitHub Actions', url: 'https://docs.github.com/en/actions', type: 'documentation' },
        { title: 'GitLab CI/CD', url: 'https://docs.gitlab.com/ee/ci/', type: 'documentation' }
      ],
      skills: ['Git', 'GitHub Actions', 'GitLab CI', 'Pipeline Design', 'Automated Testing', 'Deployment Strategies'],
      completed: false,
      inProgress: false,
      phase: 4
    },
    {
      id: 'devops-monitoring',
      title: 'Monitoring & Observability',
      description: 'Implement comprehensive monitoring with ELK stack, Prometheus, and Grafana.',
      category: 'Operations',
      estimatedHours: 90,
      difficulty: 'intermediate',
      prerequisites: ['devops-git-cicd'],
      resources: [
        { title: 'Prometheus Documentation', url: 'https://prometheus.io/docs/', type: 'documentation' },
        { title: 'Grafana Tutorials', url: 'https://grafana.com/tutorials/', type: 'course' },
        { title: 'ELK Stack Guide', url: 'https://www.elastic.co/guide/', type: 'documentation' }
      ],
      skills: ['Prometheus', 'Grafana', 'Elasticsearch', 'Logstash', 'Kibana', 'Alert Management'],
      completed: false,
      inProgress: false,
      phase: 4
    },

    // Phase 5: DevSecOps Integration
    {
      id: 'devsecops-sast-dast',
      title: 'Static & Dynamic Analysis',
      description: 'Integrate SAST and DAST tools like SonarQube and OWASP ZAP into CI/CD pipelines.',
      category: 'Security',
      estimatedHours: 70,
      difficulty: 'advanced',
      prerequisites: ['devops-git-cicd', 'foundation-security'],
      resources: [
        { title: 'SonarQube Documentation', url: 'https://docs.sonarqube.org/', type: 'tool' },
        { title: 'OWASP ZAP', url: 'https://www.zaproxy.org/docs/', type: 'tool' },
        { title: 'Snyk Security Platform', url: 'https://snyk.io/learn/', type: 'tool' }
      ],
      skills: ['SAST', 'DAST', 'Security Testing', 'Vulnerability Management', 'Code Quality Gates'],
      completed: false,
      inProgress: false,
      phase: 5
    },
    {
      id: 'devsecops-iac-scanning',
      title: 'Infrastructure Scanning',
      description: 'Implement IaC security scanning with Checkov, TFSec, and compliance policies.',
      category: 'Security',
      estimatedHours: 60,
      difficulty: 'advanced',
      prerequisites: ['cloud-iac', 'devsecops-sast-dast'],
      resources: [
        { title: 'Checkov Documentation', url: 'https://www.checkov.io/1.Welcome/What%20is%20Checkov.html', type: 'tool' },
        { title: 'TFSec', url: 'https://tfsec.dev/', type: 'tool' },
        { title: 'Terraform Compliance', url: 'https://terraform-compliance.com/', type: 'tool' }
      ],
      skills: ['IaC Scanning', 'Policy as Code', 'Compliance Automation', 'Security Policies'],
      completed: false,
      inProgress: false,
      phase: 5
    },

    // Phase 6: Container Security
    {
      id: 'container-docker-security',
      title: 'Docker Security Hardening',
      description: 'Secure Docker containers with best practices and security scanning tools.',
      category: 'Containers',
      estimatedHours: 80,
      difficulty: 'advanced',
      prerequisites: ['devops-git-cicd'],
      resources: [
        { title: 'Docker Security', url: 'https://docs.docker.com/engine/security/', type: 'documentation' },
        { title: 'Docker Bench Security', url: 'https://github.com/docker/docker-bench-security', type: 'tool' },
        { title: 'Trivy Scanner', url: 'https://trivy.dev/', type: 'tool' }
      ],
      skills: ['Docker Security', 'Container Scanning', 'Image Hardening', 'Runtime Security'],
      completed: false,
      inProgress: false,
      phase: 6
    },
    {
      id: 'container-k8s-security',
      title: 'Kubernetes Security',
      description: 'Implement Kubernetes security with RBAC, network policies, and security benchmarks.',
      category: 'Orchestration',
      estimatedHours: 120,
      difficulty: 'expert',
      prerequisites: ['container-docker-security'],
      resources: [
        { title: 'Kubernetes Security', url: 'https://kubernetes.io/docs/concepts/security/', type: 'documentation' },
        { title: 'CIS Kubernetes Benchmark', url: 'https://www.cisecurity.org/benchmark/kubernetes', type: 'documentation' },
        { title: 'Falco Runtime Security', url: 'https://falco.org/docs/', type: 'tool' }
      ],
      skills: ['Kubernetes Security', 'RBAC', 'Network Policies', 'Pod Security', 'Runtime Monitoring'],
      completed: false,
      inProgress: false,
      phase: 6
    },

    // Phase 7: Advanced Architecture
    {
      id: 'advanced-zero-trust',
      title: 'Zero Trust Architecture',
      description: 'Design and implement zero trust security models with identity verification and micro-segmentation.',
      category: 'Architecture',
      estimatedHours: 100,
      difficulty: 'expert',
      prerequisites: ['cloud-network-security', 'cloud-iam'],
      resources: [
        { title: 'NIST Zero Trust Architecture', url: 'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf', type: 'documentation' },
        { title: 'Microsoft Zero Trust', url: 'https://www.microsoft.com/en-us/security/business/zero-trust', type: 'documentation' },
        { title: 'AWS Zero Trust', url: 'https://aws.amazon.com/blogs/publicsector/implementing-zero-trust-architectures-aws/', type: 'documentation' }
      ],
      skills: ['Zero Trust', 'Identity Verification', 'Micro-segmentation', 'Conditional Access', 'Continuous Verification'],
      completed: false,
      inProgress: false,
      phase: 7
    },
    {
      id: 'advanced-siem-soar',
      title: 'SIEM/SOAR Implementation',
      description: 'Deploy and configure SIEM/SOAR solutions for security operations and incident response.',
      category: 'Operations',
      estimatedHours: 90,
      difficulty: 'expert',
      prerequisites: ['devops-monitoring', 'foundation-security'],
      resources: [
        { title: 'Splunk Documentation', url: 'https://docs.splunk.com/', type: 'tool' },
        { title: 'Azure Sentinel', url: 'https://docs.microsoft.com/en-us/azure/sentinel/', type: 'tool' },
        { title: 'Elastic SIEM', url: 'https://www.elastic.co/security', type: 'tool' }
      ],
      skills: ['SIEM Configuration', 'SOAR Automation', 'Incident Response', 'Threat Detection', 'Log Analysis'],
      completed: false,
      inProgress: false,
      phase: 7
    },

    // Phase 8: Certifications
    {
      id: 'cert-aws-security',
      title: 'AWS Certified Security - Specialty',
      description: 'Validate your AWS security expertise with the official security specialty certification.',
      category: 'Certification',
      estimatedHours: 120,
      difficulty: 'expert',
      prerequisites: ['cloud-iam', 'cloud-network-security', 'advanced-zero-trust'],
      resources: [
        { title: 'AWS Security Specialty Exam Guide', url: 'https://aws.amazon.com/certification/certified-security-specialty/', type: 'certification' },
        { title: 'AWS Security Learning Path', url: 'https://aws.amazon.com/training/learn-about/security/', type: 'course' },
        { title: 'Practice Exams', url: 'https://aws.amazon.com/certification/certification-prep/', type: 'practice' }
      ],
      skills: ['AWS Security Services', 'Incident Response', 'Logging and Monitoring', 'Infrastructure Security'],
      completed: false,
      inProgress: false,
      phase: 8
    },
    {
      id: 'cert-k8s-security',
      title: 'Certified Kubernetes Security Specialist (CKS)',
      description: 'Demonstrate expertise in securing Kubernetes clusters and containerized applications.',
      category: 'Certification',
      estimatedHours: 100,
      difficulty: 'expert',
      prerequisites: ['container-k8s-security'],
      resources: [
        { title: 'CKS Exam Curriculum', url: 'https://www.cncf.io/certification/cks/', type: 'certification' },
        { title: 'Kubernetes Security Fundamentals', url: 'https://kubernetes.io/docs/concepts/security/', type: 'documentation' },
        { title: 'CKS Practice Labs', url: 'https://killer.sh/cks', type: 'practice' }
      ],
      skills: ['Cluster Setup', 'Cluster Hardening', 'System Hardening', 'Minimize Microservice Vulnerabilities', 'Supply Chain Security', 'Monitoring and Runtime Security'],
      completed: false,
      inProgress: false,
      phase: 8
    },

    // Phase 9: Continuous Growth
    {
      id: 'growth-ctf-practice',
      title: 'Capture The Flag (CTF) Practice',
      description: 'Participate in cloud security CTFs and hands-on challenges to sharpen skills.',
      category: 'Practice',
      estimatedHours: 50,
      difficulty: 'intermediate',
      prerequisites: ['foundation-security'],
      resources: [
        { title: 'AWS CTF Challenges', url: 'https://github.com/RhinoSecurityLabs/cloudgoat', type: 'practice' },
        { title: 'Google Cloud CTF', url: 'https://cloud.google.com/blog/topics/developers-practitioners/google-cloud-capture-flag-ctf-2021', type: 'practice' },
        { title: 'TryHackMe Cloud Security', url: 'https://tryhackme.com/path/outline/cloud', type: 'practice' }
      ],
      skills: ['Hands-on Security', 'Problem Solving', 'Attack Simulation', 'Defense Strategies'],
      completed: false,
      inProgress: false,
      phase: 9
    }
  ];

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('roadmap_progress');
    if (savedProgress) {
      setRoadmapProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (progress: Record<string, RoadmapItem>) => {
    setRoadmapProgress(progress);
    localStorage.setItem('roadmap_progress', JSON.stringify(progress));
  };

  const toggleItemCompletion = (itemId: string) => {
    const updatedProgress = { ...roadmapProgress };
    const item = roadmapItems.find(i => i.id === itemId);
    
    if (item) {
      updatedProgress[itemId] = {
        ...item,
        completed: !updatedProgress[itemId]?.completed,
        inProgress: false
      };
      saveProgress(updatedProgress);
      
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          title: updatedProgress[itemId].completed ? 'MILESTONE_COMPLETED' : 'MILESTONE_RESET',
          message: `${item.title} ${updatedProgress[itemId].completed ? 'completed' : 'reset'}`,
          type: updatedProgress[itemId].completed ? 'success' : 'info'
        }
      });
    }
  };

  const toggleItemProgress = (itemId: string) => {
    const updatedProgress = { ...roadmapProgress };
    const item = roadmapItems.find(i => i.id === itemId);
    
    if (item) {
      updatedProgress[itemId] = {
        ...item,
        inProgress: !updatedProgress[itemId]?.inProgress,
        completed: false
      };
      saveProgress(updatedProgress);
    }
  };

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getPhaseStats = (phaseId: number) => {
    const phaseItems = roadmapItems.filter(item => item.phase === phaseId);
    const completed = phaseItems.filter(item => roadmapProgress[item.id]?.completed).length;
    const inProgress = phaseItems.filter(item => roadmapProgress[item.id]?.inProgress).length;
    const total = phaseItems.length;
    const totalHours = phaseItems.reduce((sum, item) => sum + item.estimatedHours, 0);
    const completedHours = phaseItems
      .filter(item => roadmapProgress[item.id]?.completed)
      .reduce((sum, item) => sum + item.estimatedHours, 0);
    
    return { completed, inProgress, total, totalHours, completedHours };
  };

  const getOverallStats = () => {
    const completed = roadmapItems.filter(item => roadmapProgress[item.id]?.completed).length;
    const inProgress = roadmapItems.filter(item => roadmapProgress[item.id]?.inProgress).length;
    const total = roadmapItems.length;
    const totalHours = roadmapItems.reduce((sum, item) => sum + item.estimatedHours, 0);
    const completedHours = roadmapItems
      .filter(item => roadmapProgress[item.id]?.completed)
      .reduce((sum, item) => sum + item.estimatedHours, 0);
    
    return { completed, inProgress, total, totalHours, completedHours };
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-400/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-400/20';
      case 'advanced': return 'text-orange-400 bg-orange-400/20';
      case 'expert': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getItemStatus = (item: RoadmapItem) => {
    const progress = roadmapProgress[item.id];
    if (progress?.completed) return 'completed';
    if (progress?.inProgress) return 'in-progress';
    return 'not-started';
  };

  const filteredItems = roadmapItems
    .filter(item => item.phase === selectedPhase)
    .filter(item => {
      if (showOnlyIncomplete) {
        return !roadmapProgress[item.id]?.completed;
      }
      return true;
    })
    .filter(item => {
      if (selectedDifficulty === 'all') return true;
      return item.difficulty === selectedDifficulty;
    });

  const overallStats = getOverallStats();
  const currentPhaseStats = getPhaseStats(selectedPhase);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="cyber-card rounded-xl p-6 cyber-border cyber-hologram">
          <div className="flex items-center justify-between">
            <div>
              <p className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2">
                OVERALL_PROGRESS
              </p>
              <p className="text-3xl font-bold cyber-font text-white cyber-text-glow">
                {overallStats.completed}/{overallStats.total}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center cyber-glow">
              <Target className="w-6 h-6 text-black" />
            </div>
          </div>
          <div className="mt-4 w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div 
              className="cyber-progress h-2 rounded-full" 
              style={{width: `${(overallStats.completed / overallStats.total) * 100}%`}}
            ></div>
          </div>
        </div>

        <div className="cyber-card rounded-xl p-6 cyber-border cyber-hologram">
          <div className="flex items-center justify-between">
            <div>
              <p className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2">
                LEARNING_HOURS
              </p>
              <p className="text-3xl font-bold cyber-font text-white cyber-text-glow">
                {overallStats.completedHours}h
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center cyber-glow">
              <Timer className="w-6 h-6 text-black" />
            </div>
          </div>
          <p className="cyber-font text-xs text-gray-400 mt-2">
            of {overallStats.totalHours}h total
          </p>
        </div>

        <div className="cyber-card rounded-xl p-6 cyber-border cyber-hologram">
          <div className="flex items-center justify-between">
            <div>
              <p className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2">
                IN_PROGRESS
              </p>
              <p className="text-3xl font-bold cyber-font text-white cyber-text-glow">
                {overallStats.inProgress}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center cyber-glow">
              <Play className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>

        <div className="cyber-card rounded-xl p-6 cyber-border cyber-hologram">
          <div className="flex items-center justify-between">
            <div>
              <p className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2">
                COMPLETION_RATE
              </p>
              <p className="text-3xl font-bold cyber-font text-white cyber-text-glow">
                {Math.round((overallStats.completed / overallStats.total) * 100)}%
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center cyber-glow">
              <TrendingUp className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Introduction */}
      <div className="cyber-card rounded-xl p-8 cyber-border cyber-hologram">
        <div className="flex items-start space-x-6">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center cyber-glow">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="cyber-font text-2xl font-bold text-white cyber-text-glow mb-4">
              CLOUD_SECURITY + DEVSECOPS_ROADMAP
            </h2>
            <p className="text-gray-300 mb-4">
              A comprehensive, step-by-step self-study roadmap to becoming a Cloud Security + DevSecOps practitioner. 
              Each phase builds on the previous, with curated resources and hands-on projects to solidify your expertise.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2 text-cyan-400">
                <BookOpen className="w-4 h-4" />
                <span>9 Learning Phases</span>
              </div>
              <div className="flex items-center space-x-2 text-green-400">
                <Timer className="w-4 h-4" />
                <span>{overallStats.totalHours}+ Study Hours</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-400">
                <Award className="w-4 h-4" />
                <span>Industry Certifications</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Navigation */}
      <div className="cyber-card rounded-xl p-6 cyber-border cyber-hologram">
        <div className="flex items-center justify-between mb-6">
          <h3 className="cyber-font text-xl font-bold text-white cyber-text-glow">
            LEARNING_PHASES
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="incomplete-only"
                checked={showOnlyIncomplete}
                onChange={(e) => setShowOnlyIncomplete(e.target.checked)}
                className="rounded border-cyan-400/30 bg-gray-800 text-cyan-400 focus:ring-cyan-400"
              />
              <label htmlFor="incomplete-only" className="cyber-font text-sm text-cyan-400">
                Show incomplete only
              </label>
            </div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="cyber-terminal border border-cyan-400/30 rounded-lg px-3 py-1 cyber-font text-sm text-cyan-400 focus:outline-none focus:border-cyan-400"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {phases.map((phase) => {
            const stats = getPhaseStats(phase.id);
            const Icon = phase.icon;
            
            return (
              <button
                key={phase.id}
                onClick={() => setSelectedPhase(phase.id)}
                className={`p-4 rounded-xl cyber-border transition-all duration-300 text-left ${
                  selectedPhase === phase.id
                    ? 'border-cyan-400 cyber-glow bg-cyan-400/10'
                    : 'border-gray-600 hover:border-cyan-400/50'
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${phase.color} flex items-center justify-center cyber-glow`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="cyber-font font-bold text-white">Phase {phase.id}</h4>
                    <p className="text-sm text-gray-400">{phase.title}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-cyan-400">{stats.completed}/{stats.total}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="cyber-progress h-1.5 rounded-full" 
                      style={{width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%`}}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{stats.completedHours}h completed</span>
                    <span>{stats.totalHours}h total</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Phase Items */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="cyber-font text-xl font-bold text-white cyber-text-glow">
            PHASE_{selectedPhase}: {phases.find(p => p.id === selectedPhase)?.title.toUpperCase()}
          </h3>
          <div className="text-sm text-gray-400">
            {currentPhaseStats.completed}/{currentPhaseStats.total} items completed
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="cyber-card rounded-xl p-12 cyber-border cyber-hologram text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-gray-400/20 to-gray-600/20 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="cyber-font text-xl font-bold text-gray-400 mb-2">
              NO_ITEMS_FOUND
            </h3>
            <p className="text-gray-500 cyber-font">
              {showOnlyIncomplete 
                ? 'All items in this phase are completed!'
                : 'No items match your current filters.'}
            </p>
          </div>
        ) : (
          filteredItems.map((item, index) => {
            const status = getItemStatus(item);
            const isExpanded = expandedItems.includes(item.id);
            
            return (
              <div
                key={item.id}
                className={`cyber-card rounded-xl p-6 cyber-border transition-all duration-300 cyber-hologram ${
                  status === 'completed' ? 'border-green-400/50 bg-green-400/5' :
                  status === 'in-progress' ? 'border-orange-400/50 bg-orange-400/5' :
                  'hover:border-cyan-400/50'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex flex-col items-center space-y-2 mt-1">
                      <button
                        onClick={() => toggleItemCompletion(item.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          status === 'completed'
                            ? 'bg-green-500 border-green-500 cyber-glow'
                            : 'border-gray-500 hover:border-cyan-400'
                        }`}
                      >
                        {status === 'completed' && (
                          <CheckCircle className="w-4 h-4 text-black" />
                        )}
                      </button>
                      
                      <button
                        onClick={() => toggleItemProgress(item.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          status === 'in-progress'
                            ? 'bg-orange-500 border-orange-500 cyber-glow'
                            : 'border-gray-500 hover:border-orange-400'
                        }`}
                      >
                        {status === 'in-progress' && (
                          <Play className="w-3 h-3 text-black" />
                        )}
                      </button>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className={`cyber-font font-bold transition-colors ${
                          status === 'completed' ? 'text-green-400 line-through' :
                          status === 'in-progress' ? 'text-orange-400' :
                          'text-white hover:text-cyan-400'
                        }`}>
                          {item.title}
                        </h4>
                        
                        <span className={`cyber-font text-xs px-2 py-1 rounded ${getDifficultyColor(item.difficulty)}`}>
                          {item.difficulty.toUpperCase()}
                        </span>
                        
                        <span className="cyber-font text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-400">
                          {item.estimatedHours}h
                        </span>
                      </div>

                      <p className="text-sm text-gray-300 mb-3">{item.description}</p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.skills.slice(0, 4).map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs cyber-font bg-cyan-500/20 text-cyan-400 border border-cyan-400/30"
                          >
                            {skill}
                          </span>
                        ))}
                        {item.skills.length > 4 && (
                          <span className="text-xs text-gray-400 cyber-font">
                            +{item.skills.length - 4} more
                          </span>
                        )}
                      </div>

                      {isExpanded && (
                        <div className="space-y-4 pt-4 border-t border-gray-700">
                          {item.prerequisites.length > 0 && (
                            <div>
                              <h5 className="cyber-font text-sm font-bold text-cyan-400 mb-2">Prerequisites:</h5>
                              <div className="flex flex-wrap gap-2">
                                {item.prerequisites.map((prereq, prereqIndex) => {
                                  const prereqItem = roadmapItems.find(i => i.id === prereq);
                                  const prereqCompleted = roadmapProgress[prereq]?.completed;
                                  
                                  return (
                                    <span
                                      key={prereqIndex}
                                      className={`text-xs px-2 py-1 rounded cyber-font ${
                                        prereqCompleted 
                                          ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                                          : 'bg-red-500/20 text-red-400 border border-red-400/30'
                                      }`}
                                    >
                                      {prereqItem?.title || prereq}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          <div>
                            <h5 className="cyber-font text-sm font-bold text-cyan-400 mb-2">All Skills:</h5>
                            <div className="flex flex-wrap gap-2">
                              {item.skills.map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="text-xs px-2 py-1 rounded cyber-font bg-gray-700/50 text-gray-300 border border-gray-600"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h5 className="cyber-font text-sm font-bold text-cyan-400 mb-2">Learning Resources:</h5>
                            <div className="space-y-2">
                              {item.resources.map((resource, resourceIndex) => (
                                <a
                                  key={resourceIndex}
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-3 p-3 rounded-lg cyber-border hover:border-cyan-400 transition-colors group"
                                >
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                    resource.type === 'course' ? 'bg-blue-500/20 text-blue-400' :
                                    resource.type === 'documentation' ? 'bg-green-500/20 text-green-400' :
                                    resource.type === 'tool' ? 'bg-purple-500/20 text-purple-400' :
                                    resource.type === 'certification' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-gray-500/20 text-gray-400'
                                  }`}>
                                    {resource.type === 'course' ? <BookOpen className="w-4 h-4" /> :
                                     resource.type === 'documentation' ? <FileText className="w-4 h-4" /> :
                                     resource.type === 'tool' ? <Settings className="w-4 h-4" /> :
                                     resource.type === 'certification' ? <Award className="w-4 h-4" /> :
                                     <ExternalLink className="w-4 h-4" />}
                                  </div>
                                  <div className="flex-1">
                                    <div className="cyber-font text-sm text-white group-hover:text-cyan-400 transition-colors">
                                      {resource.title}
                                    </div>
                                    <div className="text-xs text-gray-400 capitalize">
                                      {resource.type}
                                    </div>
                                  </div>
                                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="cyber-scan-line mt-4"></div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CloudSecurityRoadmap;