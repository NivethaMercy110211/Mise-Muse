/* ==========================================================================
   MISE & MUSE - CENTRAL STATE MANAGEMENT & SEED DATA (2026 Platform)
   ========================================================================== */

const MISE_STATE_KEY = 'mise_muse_culinary_state_v6';

const INITIAL_CLASSES_DATA = [
  {
    id: 'pasta-lab',
    title: 'Italian Handcrafted Pasta & Emulsion Lab',
    slug: 'italian-pasta-lab',
    cuisine: 'Italian',
    difficulty: 'STARTER',
    price: 145,
    duration: '3.5 Hours',
    chefId: 'marco-rossi',
    chefName: 'Chef Marco Rossi',
    image: 'images/classes/pasta-lab.jpg',
    skillSummary: 'Master 00 flour hydration, handmade tagliatelle, agnolotti dal plin, and silky emulsified butter-sage reduction.',
    capacity: 12,
    bookedSeats: 8,
    upcomingDate: '2026-09-26',
    time: '18:00 - 21:30',
    vegetarianFriendly: true,
    whatYoullCook: [
      { name: 'Silky Tagliatelle al Tartufo', desc: 'Hand-rolled egg yolk ribbon pasta with summer truffle reduction.', img: 'assets/classes/dish-tagliatelle-tartufo.jpg' },
      { name: 'Piedmontese Agnolotti dal Plin', desc: 'Pinched pocket pasta filled with roasted squash and brown butter.', img: 'assets/classes/dish-agnolotti-plin.jpg' }
    ],
    techniques: [
      'Gluten web development & 57% hydration calculation',
      'Wooden dowel pasta sheeting & zero-stretch cutting',
      'Starch water emulsification (Mantecatura) without cream',
      'Micro-seasoning with 24-month aged Reggiano crumbles'
    ],
    whatToBring: 'Comfortable non-slip kitchen shoes, hair tie for long hair. Apron and Japanese prep knives provided.'
  },
  {
    id: 'spice-technique',
    title: 'Modern Indian Coastal Spice & Charcoal Craft',
    slug: 'indian-coastal-spice',
    cuisine: 'Indian',
    difficulty: 'CONFIDENT',
    price: 155,
    duration: '4.0 Hours',
    chefId: 'priya-sharma',
    chefName: 'Chef Priya Sharma',
    image: 'images/classes/spice-technique.jpg',
    skillSummary: 'Understand whole spice bloom chemistry, stone-ground kokum masalas, sourdough parottas, and direct coastal grilling.',
    capacity: 10,
    bookedSeats: 7,
    upcomingDate: '2026-09-28',
    time: '17:30 - 21:30',
    vegetarianFriendly: true,
    whatYoullCook: [
      { name: 'Malabar Prawn & Kokum Curry', desc: 'Fresh coconut milk broth balanced with tart tamarind & curry leaves.', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop' },
      { name: 'Crispy Layered Coin Parotta', desc: 'Laminated flaky bread flipped over high-heat seasoned cast iron.', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop' }
    ],
    techniques: [
      'Tadka dynamics: heat thresholds for mustard, fenugreek & hing',
      'Coconut flesh extraction: first and second press balances',
      'Lamination of dough through oil resting and dough slapping',
      'Live charcoal smoke infusion (Dhungar method)'
    ],
    whatToBring: 'Appetite for aromatic spice, closed-toe footwear. Premium studio apron is provided.'
  },
  {
    id: 'artisan-sourdough',
    title: 'High-Hydration Wild Sourdough & Laminated Brioche',
    slug: 'artisan-baking-lab',
    cuisine: 'Baking',
    difficulty: 'SKILLED',
    price: 165,
    duration: '4.5 Hours',
    chefId: 'camille-laurent',
    chefName: 'Chef Camille Laurent',
    image: 'images/classes/artisan-sourdough.jpg',
    skillSummary: 'Levain fermentation science, coil folding, Dutch oven steam control, and honeycomb open-crumb architecture.',
    capacity: 8,
    bookedSeats: 7,
    upcomingDate: '2026-09-30',
    time: '10:00 - 14:30',
    vegetarianFriendly: true,
    whatYoullCook: [
      { name: '80% Hydration Country Boule', desc: 'Blistered crust sourdough with deep wild yeast ferment notes.', img: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?q=80&w=800&auto=format&fit=crop' },
      { name: 'Cultured Butter Honey Brioche', desc: 'Feathery soft golden loaf enriched with 84% Normandy butter.', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop' }
    ],
    techniques: [
      'Levain feeding schedules and peak acid curves',
      'Bassinage technique to incorporate maximum water volume',
      'Razor blade scoring angles for optimal oven ear rise',
      'Crumb reading & fermentation troubleshooting'
    ],
    whatToBring: 'Clean bread bag or cotton container to take home your hot freshly baked boules.'
  },
  {
    id: 'bangkok-street-lab',
    title: 'Bangkok Night Market: Wok Breath & Balance',
    slug: 'thai-street-food',
    cuisine: 'Thai',
    difficulty: 'CONFIDENT',
    price: 140,
    duration: '3.5 Hours',
    chefId: 'somchai-prasert',
    chefName: 'Chef Somchai Prasert',
    image: 'images/classes/bangkok-street.jpg',
    skillSummary: 'Master the 5 Thai flavor pillars (sweet, sour, salty, bitter, umami) with 100k BTU wok station control.',
    capacity: 12,
    bookedSeats: 9,
    upcomingDate: '2026-10-02',
    time: '18:30 - 22:00',
    vegetarianFriendly: true,
    whatYoullCook: [
      { name: 'Smoky Pad See Ew', desc: 'Charred wide rice noodles with crisp Chinese broccoli and dark soy.', img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800&auto=format&fit=crop' },
      { name: 'Hand-Pounded Green Papaya Som Tum', desc: 'Crushed bird’s eye chilies, roasted peanuts, palm sugar and lime.', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop' }
    ],
    techniques: [
      'Wok Hei creation without torch shortcuts',
      'Clay pestle and mortar bruising vs chopping',
      'Palm sugar caramelization for noodle sauce bases',
      'Balancing heat and citrus acidity in real time'
    ],
    whatToBring: 'Comfortable clothing suitable for high live heat.'
  },
  {
    id: 'french-sauce-craft',
    title: 'The Modern French Mother Sauces & Pan Roasting',
    slug: 'french-continental-sauces',
    cuisine: 'Continental',
    difficulty: 'SKILLED',
    price: 170,
    duration: '4.0 Hours',
    chefId: 'camille-laurent',
    chefName: 'Chef Camille Laurent',
    image: 'images/classes/french-sauces.jpg',
    skillSummary: 'Classic fond reduction, clarified butter emulsions, velouté refinement, and dry-aged sear precision.',
    capacity: 10,
    bookedSeats: 6,
    upcomingDate: '2026-10-05',
    time: '18:00 - 22:00',
    vegetarianFriendly: false,
    whatYoullCook: [
      { name: 'Duck Breast with Cherry Port Demi-Glace', desc: 'Crispy cross-hatched skin with glossy 24-hour reduced veal fond.', img: 'https://images.unsplash.com/photo-1514944298352-f6738b55d218?q=80&w=800&auto=format&fit=crop' },
      { name: 'Tarragon Bearnaise & Asparagus', desc: 'Silky warm egg emulsion with shallot-vinegar reduction.', img: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?q=80&w=800&auto=format&fit=crop' }
    ],
    techniques: [
      'Fond deglazing and multi-stage stock reduction',
      'Cold butter monter au beurre mounting technique',
      'Protein temperature staging & carryover resting curves',
      'Clarification and lipid temperature isolation'
    ],
    whatToBring: 'Closed-toe leather shoes recommended.'
  },
  {
    id: 'neapolitan-pizza',
    title: 'Neapolitan 48-Hour Fermented Pizza & Wood Fired Crusts',
    slug: 'neapolitan-pizza-masterclass',
    cuisine: 'Italian',
    difficulty: 'STARTER',
    price: 135,
    duration: '3.0 Hours',
    chefId: 'marco-rossi',
    chefName: 'Chef Marco Rossi',
    image: 'images/classes/neapolitan-pizza.jpg',
    skillSummary: 'From biga pre-ferment to 900°F stone turning, achieve leopard-spotted cornicione dough perfection.',
    capacity: 12,
    bookedSeats: 11,
    upcomingDate: '2026-10-08',
    time: '17:00 - 20:00',
    vegetarianFriendly: true,
    whatYoullCook: [
      { name: 'Classic Margherita DOP', desc: 'San Marzano tomatoes, fior di latte, fresh basil, cold-pressed olive oil.', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop' },
      { name: 'Charred Mortadella & Pistachio Pesto', desc: 'Creamy burrata heart with roasted Sicilian pistachio paste.', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop' }
    ],
    techniques: [
      'Biga preparation and bulk cold fermentation',
      'Gentle dough opening without degasifying the perimeter',
      'Peel handling, oven dome heat radiation and turning',
      'San Marzano hand-crush consistency & balance'
    ],
    whatToBring: 'Excitement and an appetite for fresh pizza straight out of the stone oven.'
  }
];

const INITIAL_STATE = {
  isAuthenticated: true,
  student: {
    name: 'Elena Vance',
    email: 'elena.vance@studio.culinary',
    phone: '+1 (555) 382-9912',
    level: 'Confident Cook',
    initials: 'EV',
    dietary: 'Vegetarian Friendly',
    emergencyContact: 'Marcus Vance (+1 555-839-2041)',
    bio: 'Passionate home cook exploring artisanal dough hydration and regional Mediterranean emulsion dynamics.',
    settings: {
      units: 'metric',
      preferredCuisine: 'Italian',
      emailReminders: true,
      smsReminders: true,
      recipeDropAlerts: true,
      calendarSync: true
    },
    bookings: [
      {
        id: 'BK-2026-889',
        classId: 'pasta-lab',
        classTitle: 'Italian Handcrafted Pasta & Emulsion Lab',
        cuisine: 'Italian',
        chefName: 'Chef Marco Rossi',
        date: '2026-09-26',
        time: '18:00 - 21:30',
        seats: 2,
        status: 'CONFIRMED',
        studio: 'Studio 1 · Central Island (Kitchen Atelier)',
        whatToBring: 'Comfortable non-slip kitchen shoes, hair tie for long hair. Japanese prep knives & custom linen apron provided.'
      },
      {
        id: 'BK-2026-914',
        classId: 'artisan-sourdough',
        classTitle: 'Wild Sourdough & Laminated Brioche',
        cuisine: 'Baking',
        chefName: 'Chef Camille Laurent',
        date: '2026-09-30',
        time: '10:00 - 14:30',
        seats: 1,
        status: 'CONFIRMED',
        studio: 'Studio 2 · Bakery Atelier',
        whatToBring: 'Clean bread bag, closed-toe footwear, and a notebook for fermentation timings.'
      }
    ],
    tastePassport: {
      Italian: { completed: 3, lastDate: '2026-09-12' },
      Indian: { completed: 1, lastDate: '2026-08-24' },
      Baking: { completed: 2, lastDate: '2026-09-02' },
      Thai: { completed: 0, lastDate: null },
      Continental: { completed: 0, lastDate: null },
      Japanese: { completed: 0, lastDate: null },
      French: { completed: 0, lastDate: null },
      Mediterranean: { completed: 0, lastDate: null }
    },
    pastClasses: [
      {
        id: 'PAST-01',
        title: 'Handmade Pasta Workshop',
        cuisine: 'Italian',
        chef: 'Chef Marco Rossi',
        date: '12 September 2026',
        year: '2026',
        recipeId: 'rec-pasta-01'
      },
      {
        id: 'PAST-02',
        title: 'Artisan Country Bread & Levain',
        cuisine: 'Baking',
        chef: 'Chef Camille Laurent',
        date: '02 September 2026',
        year: '2026',
        recipeId: 'rec-bread-01'
      },
      {
        id: 'PAST-03',
        title: 'Kashmiri Rogan Josh & Tandoor Roti',
        cuisine: 'Indian',
        chef: 'Chef Priya Sharma',
        date: '24 August 2026',
        year: '2026',
        recipeId: 'rec-indian-01'
      }
    ],
    recipeVault: [
      {
        id: 'rec-pasta-01',
        title: '00 Flour Tagliatelle & Truffle Butter',
        cuisine: 'Italian',
        chef: 'Chef Marco Rossi',
        date: 'Sep 2026',
        img: 'images/classes/pasta-lab.jpg',
        pdfUrl: '#',
        chefNotes: 'Always rest dough for 45 minutes wrapped tightly before rolling. Emulsify pasta water when the direct heat burner is turned off.'
      },
      {
        id: 'rec-bread-01',
        title: 'Wild Levain Country Sourdough',
        cuisine: 'Baking',
        chef: 'Chef Camille Laurent',
        date: 'Sep 2026',
        img: 'images/classes/artisan-sourdough.jpg',
        pdfUrl: '#',
        chefNotes: 'Score loaf at a 30-degree angle for maximum ear spring. Keep oven at 240°C with cast iron steam cover.'
      },
      {
        id: 'rec-indian-01',
        title: 'Slow-Cooked Rogan Josh & Ratanjot Infusion',
        cuisine: 'Indian',
        chef: 'Chef Priya Sharma',
        date: 'Aug 2026',
        img: 'images/classes/spice-technique.jpg',
        pdfUrl: '#',
        chefNotes: 'Temper whole mace and black cardamom in warm mustard oil first before introducing ground Kashmiri chili and fennel.'
      }
    ],
    chefNotesList: [
      {
        category: "Chef's Tip",
        dish: "Tagliatelle al Tartufo",
        chef: "Chef Marco Rossi",
        content: "Never rinse cooked fresh pasta with cold water. The surface starches are essential to bond with your butter emulsion."
      },
      {
        category: "Common Mistake",
        dish: "Wild Sourdough",
        chef: "Chef Camille Laurent",
        content: "Cutting hot bread straight from the Dutch oven collapses crumb structures. Allow moisture redistribution for 90 minutes minimum."
      },
      {
        category: "Technique Reminder",
        dish: "Coastal Curry",
        chef: "Chef Priya Sharma",
        content: "Add second-press coconut milk during boiling; reserve thick first-press milk for the final 60 seconds off the flame to prevent curdling."
      }
    ]
  },
  classes: INITIAL_CLASSES_DATA
};

class MiseStateManager {
  constructor() {
    this.state = this.loadState();
  }

  loadState() {
    try {
      const stored = localStorage.getItem(MISE_STATE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed.classes)) {
          parsed.classes = parsed.classes.map(c => {
            const initC = INITIAL_CLASSES_DATA.find(item => item.id === c.id);
            return initC ? { ...c, image: initC.image, whatYoullCook: initC.whatYoullCook } : c;
          });
        }
        if (parsed?.student && Array.isArray(parsed.student.recipeVault)) {
          parsed.student.recipeVault = parsed.student.recipeVault.map(recipe => {
            const initialRecipe = INITIAL_STATE.student.recipeVault.find(item => item.id === recipe.id);
            return initialRecipe ? { ...recipe, img: initialRecipe.img } : recipe;
          });
        }
        if (parsed?.student && Array.isArray(parsed.student.bookings)) {
          const additionalBooking = INITIAL_STATE.student.bookings.find(item => item.id === 'BK-2026-914');
          if (additionalBooking && !parsed.student.bookings.some(item => item.id === additionalBooking.id)) {
            parsed.student.bookings.push({ ...additionalBooking });
          }
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Could not read state from localStorage, initializing fresh', e);
    }
    this.saveState(INITIAL_STATE);
    return INITIAL_STATE;
  }

  saveState(state) {
    this.state = state;
    try {
      localStorage.setItem(MISE_STATE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Could not save state to localStorage', e);
    }
    window.dispatchEvent(new CustomEvent('miseStateChanged', { detail: this.state }));
  }

  isLoggedIn() {
    return Boolean(this.state.isAuthenticated);
  }

  login(email, password) {
    this.state.isAuthenticated = true;
    if (email) {
      this.state.student.email = email;
      const namePart = email.split('@')[0];
      this.state.student.name = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      this.state.student.initials = this.state.student.name.substring(0, 2).toUpperCase();
    }
    this.saveState(this.state);
    return { success: true };
  }

  signup(name, email, phone) {
    this.state.isAuthenticated = true;
    this.state.student.name = name || 'New Student';
    this.state.student.email = email || 'student@miseandmuse.com';
    this.state.student.phone = phone || '';
    const parts = this.state.student.name.split(' ');
    this.state.student.initials = (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
    this.saveState(this.state);
    return { success: true };
  }

  logout() {
    this.state.isAuthenticated = false;
    this.saveState(this.state);
  }

  getClasses() {
    return this.state.classes;
  }

  getClassById(id) {
    return this.state.classes.find(c => c.id === id || c.slug === id);
  }

  getNextClassInfo() {
    const sorted = [...this.state.classes].sort((a, b) => new Date(a.upcomingDate) - new Date(b.upcomingDate));
    return sorted[0] || this.state.classes[0];
  }

  bookClass(classId, seatsCount = 1, chosenDate = null, chosenTime = null) {
    const classItem = this.getClassById(classId);
    if (!classItem) return { success: false, message: 'Class not found.' };

    const availableSeats = classItem.capacity - classItem.bookedSeats;
    if (availableSeats < seatsCount) {
      return { success: false, message: `Only ${availableSeats} seat(s) remaining for this session.` };
    }

    classItem.bookedSeats += seatsCount;

    const bookingRef = 'BK-2026-' + Math.floor(100 + Math.random() * 900);
    const newBooking = {
      id: bookingRef,
      classId: classItem.id,
      classTitle: classItem.title,
      cuisine: classItem.cuisine,
      chefName: classItem.chefName,
      date: chosenDate || classItem.upcomingDate,
      time: chosenTime || classItem.time,
      seats: seatsCount,
      status: 'CONFIRMED',
      studio: 'Studio 1 · Central Atelier (Mise & Muse Main)',
      whatToBring: classItem.whatToBring
    };

    this.state.student.bookings.unshift(newBooking);

    // Update Taste Passport
    if (this.state.student.tastePassport[classItem.cuisine]) {
      this.state.student.tastePassport[classItem.cuisine].completed += 1;
      this.state.student.tastePassport[classItem.cuisine].lastDate = newBooking.date;
    } else {
      this.state.student.tastePassport[classItem.cuisine] = { completed: 1, lastDate: newBooking.date };
    }

    // Unlock Recipe Card in Recipe Vault
    const existingRec = this.state.student.recipeVault.find(r => r.id === `rec-${classItem.id}`);
    if (!existingRec) {
      this.state.student.recipeVault.unshift({
        id: `rec-${classItem.id}`,
        title: classItem.whatYoullCook[0]?.name || classItem.title,
        cuisine: classItem.cuisine,
        chef: classItem.chefName,
        date: 'Oct 2026',
        img: classItem.whatYoullCook[0]?.img || classItem.image,
        pdfUrl: '#',
        chefNotes: classItem.techniques[0] || 'Master emulsion dynamics.'
      });
    }

    // Add milestone in Past Classes timeline
    this.state.student.pastClasses.unshift({
      id: `PAST-${Date.now().toString().slice(-4)}`,
      title: classItem.title,
      cuisine: classItem.cuisine,
      chef: classItem.chefName,
      date: newBooking.date,
      year: '2026',
      recipeId: `rec-${classItem.id}`
    });

    this.saveState(this.state);
    return { success: true, booking: newBooking };
  }

  getStudent() {
    return this.state.student;
  }

  updateStudentProfile(profileData) {
    if (!this.state.student) return { success: false, message: 'No student found' };
    if (profileData.name) {
      this.state.student.name = profileData.name.trim();
      const parts = this.state.student.name.split(/\s+/);
      this.state.student.initials = (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
    }
    if (profileData.email) this.state.student.email = profileData.email.trim();
    if (profileData.phone !== undefined) this.state.student.phone = profileData.phone.trim();
    if (profileData.level) this.state.student.level = profileData.level;
    if (profileData.dietary !== undefined) this.state.student.dietary = profileData.dietary;
    if (profileData.emergencyContact !== undefined) this.state.student.emergencyContact = profileData.emergencyContact.trim();
    if (profileData.bio !== undefined) this.state.student.bio = profileData.bio.trim();
    this.saveState(this.state);
    return { success: true, student: this.state.student };
  }

  updateStudentSettings(settingsData) {
    if (!this.state.student) return { success: false, message: 'No student found' };
    if (!this.state.student.settings) {
      this.state.student.settings = {
        units: 'metric',
        preferredCuisine: 'Italian',
        emailReminders: true,
        smsReminders: true,
        recipeDropAlerts: true,
        calendarSync: true
      };
    }
    Object.assign(this.state.student.settings, settingsData);
    this.saveState(this.state);
    return { success: true, settings: this.state.student.settings };
  }

  getStudentSettings() {
    if (!this.state.student.settings) {
      this.state.student.settings = {
        units: 'metric',
        preferredCuisine: 'Italian',
        emailReminders: true,
        smsReminders: true,
        recipeDropAlerts: true,
        calendarSync: true
      };
    }
    return this.state.student.settings;
  }
}

window.MiseState = new MiseStateManager();
