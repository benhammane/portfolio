export const translations = {
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À propos',
      skills: 'Compétences',
      projects: 'Projets',
      experience: 'Expériences',
      parcours: 'Parcours',
      interests: 'Intérêts',
      contact: 'Contact',
      portfolio: 'Portfolio'
    },
    hero: {
      greeting: 'Bonjour, je suis',
      name: 'Amine Benhammane',
      title: 'Développeur Full-Stack & Étudiant M1 MIAGE',
      description: "Curieux et rigoureux, je me spécialise dans le développement web et la conception d'applications innovantes. Je suis à la recherche d'une alternance en développement pour contribuer à des projets concrets et approfondir mes compétences techniques.",
      contactMe: 'Me contacter',
      downloadCV: 'Télécharger CV',
      photoAlt: "Photo d'Amine Benhammane",
      downloadToast: 'Téléchargement',
      downloadSuccess: 'Votre CV a été téléchargé.',
      downloadError: 'Erreur',
      downloadErrorMessage: 'Impossible de télécharger le CV.'
    },
    about: {
      title: 'À propos de',
      titleHighlight: 'moi',
      paragraph1: "Étudiant en Master 1 Informatique (MIAGE), je me spécialise dans le développement web et la conception d'applications innovantes. Curieux, rigoureux et motivé, je recherche une alternance en développement pour approfondir mes compétences et contribuer activement à des projets concrets.",
      paragraph2: "J'ai travaillé sur des projets variés : sites web (recettes, e-commerce), applications temps réel (enchères, chat), et jeux en Java. J'utilise des technologies telles que HTML, CSS, JavaScript, PHP (Laravel), MySQL, ainsi que des outils de design comme Figma.",
      paragraph3: "Passionné par la qualité logicielle et la cybersécurité, je m'intéresse également aux architectures distribuées, à l'automatisation des tests et à l'expérience utilisateur.",
      skills: {
        frontend: 'Frontend',
        frontendTechs: 'React, Vue, TypeScript',
        backend: 'Backend',
        backendTechs: 'Node.js, Python, SQL',
        design: 'Design',
        designTechs: 'Figma, UI/UX',
        devops: 'DevOps',
        devopsTechs: 'Docker, AWS, CI/CD'
      }
    },
    skills: {
      title: 'Mes',
      titleHighlight: 'Compétences',
      subtitle: 'Technologies et outils que je maîtrise pour créer des applications performantes.'
    },
    projects: {
      title: 'Mes',
      titleHighlight: 'Projets',
      subtitle: "Une sélection de projets sur lesquels j'ai travaillé, démontrant mes compétences en développement full-stack et ma passion pour la création.",
      items: {
        recipesSite: {
          title: 'Site de partage de recettes',
          description: "Développement d'un site de partage de recettes avec interface interactive et gestion des utilisateurs."
        },
        ecommerceSite: {
          title: 'Site e-commerce',
          description: "Conception d'une boutique en ligne avec gestion des transactions, utilisateurs et catalogue."
        },
        shmupGame: {
          title: 'Jeu vidéo (shmup)',
          description: 'Conception et programmation d\'un jeu de type shoot – em up en Java.'
        },
        bikeRental: {
          title: 'Système de location de vélos',
          description: "Système autonome de location de vélos avec gestion des stations et des locations."
        },
        auctionApp: {
          title: "Application d'enchères en temps réel",
          description: "Application d'enchères en temps réel avec communication via WebSocket et backend Node.js."
        },
        railroadInk: {
          title: 'Railroad Ink (numérique)',
          description: "Version numérique du jeu multijoueur, gestion réseau et interface interactive."
        }
      }
    },
    experience: {
      title: 'Mes',
      titleHighlight: 'Experience',
      subtitle: 'Mon évolution professionnelle à travers différentes entreprises et projets.',
      items: {
        techLink: {
          title: 'Développement Frontend et Workflow (Stage)',
          company: 'Tech Link Service',
          period: '2025',
          description: "Développement d'une solution SaaS de gestion de restaurants et intégration de commandes externes sur une interface centralisée.",
          highlights: ['React / Flutterflow', 'TypeScript / JavaScript', 'Intégrations API (Uber Eats, Deliveroo)']
        },
        marocville: {
          title: 'Développement Web (Stage)',
          company: 'Equipe MAROCVILLE',
          period: '2022',
          description: "Développement d'une application de gestion (stocks, commandes, clients) avec Laravel et MySQL.",
          highlights: ['Laravel & MySQL', "Design d'interface", 'Automatisation des tests']
        },
        crepesCorner: {
          title: 'Employé polyvalent',
          company: 'Crêpes Corner',
          period: '2024',
          description: 'Mission en point de vente, gestion du service client et polyvalence opérationnelle.',
          highlights: ['Service client', 'Travail en équipe', 'Adaptabilité']
        },
        marocvilleMagasinier: {
          title: 'Magasinier',
          company: 'Equipe MAROCVILLE',
          period: '—',
          description: "Réception et documentation des produits, contrôle des colis endommagés, rangement sur étagères et assistance aux préparateurs de commandes pour le ramassage et l'emballage.",
          highlights: ['Réception & contrôle', 'Gestion des stocks', 'Préparation de commandes']
        },
        snackOMimosas: {
          title: 'Employé polyvalent',
          company: 'Snack O mimosas',
          period: '—',
          description: "Accueil et prise de commandes, préparation rapide et précise des plats, service clientèle, et entretien des zones de préparation et de salle en respectant les normes d'hygiène.",
          highlights: ['Accueil & prise de commandes', 'Préparation & propreté', 'Hygiène alimentaire']
        },
        uberEats: {
          title: 'Livreur de commandes',
          company: 'Uber Eats',
          period: '—',
          description: "Livraison rapide et sécurisée des commandes, utilisation efficace des outils de navigation et interaction professionnelle avec les clients.",
          highlights: ['Livraison & navigation', 'Relation client', 'Entretien du véhicule']
        },
        securityAgent: {
          title: 'Agent de sécurité (événement)',
          company: 'Match de football (Ligue 1)',
          period: '—',
          description: "Assurer la sécurité des spectateurs et du personnel, appliquer les mesures de contrôle et coopérer avec les forces de l'ordre pour prévenir les incidents.",
          highlights: ['Sécurité événementielle', 'Contrôle des foules', 'Coordination opérationnelle']
        },
        rgis: {
          title: 'Inventoriste',
          company: 'RGIS',
          period: 'Depuis mai 2025',
          description: "Réalisation d'inventaires dans le nord de la France : comptage, validation et remontée des écarts, travail en équipe et rigueur des données.",
          highlights: ['Inventaires régionaux', 'Précision & fiabilité', 'Travail en équipe']
        }
      }
    },
    parcours: {
      title: 'Mon',
      titleHighlight: 'Parcours',
      subtitle: 'Parcours universitaire et formations suivies.',
      items: {
        l1: {
          degree: 'L1 Informatique Mathématique',
          school: 'Université Picardie Jules Verne, Amiens'
        },
        l2: {
          degree: 'L2 Informatique',
          school: 'Université de Lille'
        },
        l3: {
          degree: 'L3 Informatique',
          school: 'Université de Lille'
        },
        m1: {
          degree: 'M1 MIAGE',
          school: 'Université de Lille'
        }
      }
    },
    interests: {
      title: 'Centres',
      titleHighlight: "d'intérêt",
      subtitle: 'Au-delà du code, voici ce qui me passionne et me motive au quotidien.',
      items: {
        photography: {
          title: 'Photographie',
          description: 'Capturer des moments et travailler la composition visuelle.'
        },
        travel: {
          title: 'Voyages',
          description: 'Découvrir de nouvelles cultures et inspirations pour mes projets.'
        },
        sport: {
          title: 'Sport',
          description: "Activité physique régulière pour garder l'esprit clair et productif."
        },
        development: {
          title: 'Développement logiciel',
          description: "Conception, algorithmes et implémentation d'applications fiables."
        },
        cybersecurity: {
          title: 'Cybersécurité & Algorithmes',
          description: 'Sécurité des données, cryptographie et optimisation des systèmes.'
        },
        streaming: {
          title: 'Streaming / Photographie',
          description: 'Création de contenu et retouche photo pour partager mes expériences.'
        }
      }
    },
    contact: {
      title: 'Me',
      titleHighlight: 'Contacter',
      subtitle: "Vous avez un projet en tête ? N'hésitez pas à me contacter pour en discuter.",
      discussTogether: 'Discutons ensemble',
      openTo: "Je suis toujours ouvert aux nouvelles opportunités, collaborations et discussions. Que ce soit pour un projet, une question ou simplement pour dire bonjour !",
      email: 'Email',
      phone: 'Téléphone',
      location: 'Localisation',
      locationValue: 'Lille, France',
      fullName: 'Nom complet',
      fullNamePlaceholder: 'Votre nom',
      emailPlaceholder: 'votre@email.com',
      message: 'Message',
      messagePlaceholder: 'Votre message...',
      send: 'Envoyer le message',
      sendSuccess: 'Message envoyé avec succès !'
    },
    footer: {
      madeWith: 'Fait avec',
      by: 'par Amine Benhammane'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      experience: 'Experience',
      parcours: 'Education',
      interests: 'Interests',
      contact: 'Contact',
      portfolio: 'Portfolio'
    },
    hero: {
      greeting: 'Hello, I am',
      name: 'Amine Benhammane',
      title: 'Full-Stack Developer & M1 MIAGE Student',
      description: 'Curious and rigorous, I specialize in web development and the design of innovative applications. I am looking for an apprenticeship in development to contribute to concrete projects and deepen my technical skills.',
      contactMe: 'Contact Me',
      downloadCV: 'Download CV',
      photoAlt: 'Photo of Amine Benhammane',
      downloadToast: 'Download',
      downloadSuccess: 'Your CV has been downloaded.',
      downloadError: 'Error',
      downloadErrorMessage: 'Unable to download CV.'
    },
    about: {
      title: 'About',
      titleHighlight: 'me',
      paragraph1: 'Student in Master 1 Computer Science (MIAGE), I specialize in web development and the design of innovative applications. Curious, rigorous and motivated, I am looking for an apprenticeship in development to deepen my skills and actively contribute to concrete projects.',
      paragraph2: 'I have worked on various projects: websites (recipes, e-commerce), real-time applications (auctions, chat), and games in Java. I use technologies such as HTML, CSS, JavaScript, PHP (Laravel), MySQL, as well as design tools like Figma.',
      paragraph3: 'Passionate about software quality and cybersecurity, I am also interested in distributed architectures, test automation and user experience.',
      skills: {
        frontend: 'Frontend',
        frontendTechs: 'React, Vue, TypeScript',
        backend: 'Backend',
        backendTechs: 'Node.js, Python, SQL',
        design: 'Design',
        designTechs: 'Figma, UI/UX',
        devops: 'DevOps',
        devopsTechs: 'Docker, AWS, CI/CD'
      }
    },
    skills: {
      title: 'My',
      titleHighlight: 'Skills',
      subtitle: 'Technologies and tools I master to create high-performance applications.'
    },
    projects: {
      title: 'My',
      titleHighlight: 'Projects',
      subtitle: 'A selection of projects I have worked on, demonstrating my full-stack development skills and passion for creation.',
      items: {
        recipesSite: {
          title: 'Recipe Sharing Website',
          description: 'Development of a recipe sharing website with interactive interface and user management.'
        },
        ecommerceSite: {
          title: 'E-commerce Website',
          description: 'Design of an online store with transaction management, users and catalog.'
        },
        shmupGame: {
          title: 'Video Game (shmup)',
          description: 'Design and programming of a shoot \'em up type game in Java.'
        },
        bikeRental: {
          title: 'Bike Rental System',
          description: 'Autonomous bike rental system with station and rental management.'
        },
        auctionApp: {
          title: 'Real-time Auction Application',
          description: 'Real-time auction application with WebSocket communication and Node.js backend.'
        },
        railroadInk: {
          title: 'Railroad Ink (digital)',
          description: 'Digital version of the multiplayer game, network management and interactive interface.'
        }
      }
    },
    experience: {
      title: 'My',
      titleHighlight: 'Experience',
      subtitle: 'My professional evolution through different companies and projects.',
      items: {
        techLink: {
          title: 'Frontend and Workflow Development (Internship)',
          company: 'Tech Link Service',
          period: '2025',
          description: 'Development of a SaaS restaurant management solution and integration of external orders on a centralized interface.',
          highlights: ['React / Flutterflow', 'TypeScript / JavaScript', 'API Integrations (Uber Eats, Deliveroo)']
        },
        marocville: {
          title: 'Web Development (Internship)',
          company: 'Equipe MAROCVILLE',
          period: '2022',
          description: 'Development of a management application (inventory, orders, customers) with Laravel and MySQL.',
          highlights: ['Laravel & MySQL', 'Interface Design', 'Test Automation']
        },
        crepesCorner: {
          title: 'Multi-skilled Employee',
          company: 'Crêpes Corner',
          period: '2024',
          description: 'Point of sale mission, customer service management and operational versatility.',
          highlights: ['Customer Service', 'Teamwork', 'Adaptability']
        },
        marocvilleMagasinier: {
          title: 'Warehouse Worker',
          company: 'Equipe MAROCVILLE',
          period: '—',
          description: 'Receiving and documenting products, checking damaged parcels, shelf storage and assisting order pickers with collection and packaging.',
          highlights: ['Reception & Control', 'Inventory Management', 'Order Preparation']
        },
        snackOMimosas: {
          title: 'Multi-skilled Employee',
          company: 'Snack O mimosas',
          period: '—',
          description: 'Welcoming and taking orders, quick and precise preparation of dishes, customer service, and maintenance of preparation and dining areas while respecting hygiene standards.',
          highlights: ['Welcome & Order Taking', 'Preparation & Cleanliness', 'Food Hygiene']
        },
        uberEats: {
          title: 'Delivery Driver',
          company: 'Uber Eats',
          period: '—',
          description: 'Fast and secure delivery of orders, efficient use of navigation tools and professional interaction with customers.',
          highlights: ['Delivery & Navigation', 'Customer Relations', 'Vehicle Maintenance']
        },
        securityAgent: {
          title: 'Security Agent (Event)',
          company: 'Football Match (Ligue 1)',
          period: '—',
          description: 'Ensuring the safety of spectators and staff, applying control measures and cooperating with law enforcement to prevent incidents.',
          highlights: ['Event Security', 'Crowd Control', 'Operational Coordination']
        },
        rgis: {
          title: 'Inventory Specialist',
          company: 'RGIS',
          period: 'Since May 2025',
          description: 'Conducting inventories in northern France: counting, validation and reporting of discrepancies, teamwork and data accuracy.',
          highlights: ['Regional Inventories', 'Accuracy & Reliability', 'Teamwork']
        }
      }
    },
    parcours: {
      title: 'My',
      titleHighlight: 'Education',
      subtitle: 'Academic background and training completed.',
      items: {
        l1: {
          degree: 'L1 Computer Science Mathematics',
          school: 'Picardie Jules Verne University, Amiens'
        },
        l2: {
          degree: 'L2 Computer Science',
          school: 'University of Lille'
        },
        l3: {
          degree: 'L3 Computer Science',
          school: 'University of Lille'
        },
        m1: {
          degree: 'M1 MIAGE',
          school: 'University of Lille'
        }
      }
    },
    interests: {
      title: 'Areas of',
      titleHighlight: 'Interest',
      subtitle: 'Beyond code, here is what I am passionate about and what motivates me daily.',
      items: {
        photography: {
          title: 'Photography',
          description: 'Capturing moments and working on visual composition.'
        },
        travel: {
          title: 'Travel',
          description: 'Discovering new cultures and inspirations for my projects.'
        },
        sport: {
          title: 'Sports',
          description: 'Regular physical activity to keep the mind clear and productive.'
        },
        development: {
          title: 'Software Development',
          description: 'Design, algorithms and implementation of reliable applications.'
        },
        cybersecurity: {
          title: 'Cybersecurity & Algorithms',
          description: 'Data security, cryptography and system optimization.'
        },
        streaming: {
          title: 'Streaming / Photography',
          description: 'Content creation and photo editing to share my experiences.'
        }
      }
    },
    contact: {
      title: 'Contact',
      titleHighlight: 'Me',
      subtitle: 'Have a project in mind? Feel free to contact me to discuss it.',
      discussTogether: "Let's discuss together",
      openTo: 'I am always open to new opportunities, collaborations and discussions. Whether for a project, a question or simply to say hello!',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      locationValue: 'Lille, France',
      fullName: 'Full Name',
      fullNamePlaceholder: 'Your name',
      emailPlaceholder: 'your@email.com',
      message: 'Message',
      messagePlaceholder: 'Your message...',
      send: 'Send message',
      sendSuccess: 'Message sent successfully!'
    },
    footer: {
      madeWith: 'Made with',
      by: 'by Amine Benhammane'
    }
  }
};
