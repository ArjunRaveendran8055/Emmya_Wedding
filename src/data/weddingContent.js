// Update the optional sections here as the couple supplies their details.
const church = "Christ The King Church, Krishnankotta"
const churchQuery = encodeURIComponent(church)

export const weddingInfo = {
  couple: { bride: "Emmya Sunny", groom: "Manu Antony" },
  initials: "M&E",
  eventLabel: "Betrothal",
  dateLabel: "Saturday, 14 November 2026",
  timeLabel: "11:30 AM onwards",
  targetDate: "2026-11-14T11:30:00+05:30",
  locationLabel: church,
  verse: "What God has joined together, let no one separate.",
  verseReference: "Matthew 19:6",
  families: [
    { name: "Emmya Sunny", relationship: "Daughter of", parents: "Mr. Joseph Sunny & Mrs. Anna Jasmine", home: "Kurisingal house, Krishnankotta" },
    { name: "Manu Antony", relationship: "Son of", parents: "Mr. Antony N.A & Mrs. Mini", home: "Puthenpurakkal House, Palamattam" },
  ],
  invitationUrl: "/invitations/emmya-manu-betrothal.pdf",
  venues: [{
    label: "Betrothal", title: church, address: church,
    mapEmbed: `https://www.google.com/maps?q=${churchQuery}&output=embed`,
    directionsUrl: `https://www.google.com/maps/search/?api=1&query=${churchQuery}`,
    directionsLabel: "Search church on Google Maps",
  }],
  contact: { phone: "", email: "sunnyebin48@gmail.com" },
}

export const events = [{
  name: "Betrothal Ceremony", date: weddingInfo.dateLabel, time: weddingInfo.timeLabel,
  venue: church, address: church, mapUrl: weddingInfo.venues[0].directionsUrl,
  directionsLabel: weddingInfo.venues[0].directionsLabel,
}]

// Supply { year, title, description } objects to replace the story placeholder.
export const storyMoments = []
export const dressDetails = []
// FormSubmit emails the family after the recipient activates its confirmation email.
// Keep url empty to use the embedded form; set url to use another external form.
export const rsvpDetails = {
  url: "",
  label: "Respond to the invitation",
  submitUrl: `https://formsubmit.co/${weddingInfo.contact.email}`,
  subject: "New RSVP — Emmya & Manu’s Betrothal",
}

export const portrait = {
  src: "/images/emmya-manu-invitation.jpg",
  alt: "Manu Antony and Emmya Sunny, from their betrothal invitation",
}
// Add a slot with an empty src to show a labelled photo placeholder.
// Browser-sized copies keep the provided originals untouched.
export const photoSlots = [
  { id: "embrace", label: "Together", src: "/images/emmya-manu-06.jpg", alt: "Emmya and Manu smiling at one another beneath the trees", position: "50% 40%" },
  { id: "portrait", label: "A quiet moment", src: "/images/emmya-manu-05.jpg", alt: "Emmya resting her head on Manu’s shoulder", position: "50% 45%" },
  { id: "garden", label: "In the garden", src: "/images/emmya-manu-04.jpg", alt: "Emmya in an orange saree with Manu standing behind her in the garden", position: "50% 45%" },
  { id: "hills", label: "Among the hills", src: "/images/emmya-manu-01.jpg", alt: "Emmya and Manu together against misty green hills", position: "50% 70%" },
  { id: "lakeside", label: "Hand in hand", src: "/images/emmya-manu-02.jpg", alt: "Emmya and Manu holding hands by the lake", position: "50% 65%" },
  { id: "memory", label: "By the water", src: "/images/emmya-manu-03.jpg", alt: "Emmya and Manu sitting together beside the lake", position: "50% 65%" },
]
const suppliedPhotos = photoSlots.filter((photo) => photo.src)
export const galleryImages = suppliedPhotos.length ? suppliedPhotos : [portrait]

export const music = {
  src: "/audio/a-quiet-promise.wav",
  title: "A Quiet Promise",
  credit: "Original synthesized piano instrumental, created for this invitation. CC0 1.0.",
  licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  volume: 0.3,
}

export const missingDetails = [
  { id: "story", label: "Their story", description: "Add how they met and the moments they would like to share.", missing: storyMoments.length === 0 },
  { id: "gallery", label: "Additional photos", description: "Add the couple’s new photographs to the labelled photo slots.", missing: photoSlots.some((photo) => !photo.src) },
  { id: "details", label: "Dress guidance", description: "Add any attire preferences or guest notes confirmed by the families.", missing: dressDetails.length === 0 },
  { id: "rsvp", label: "RSVP details", description: "Add an RSVP contact or a link to a working response form.", missing: !rsvpDetails.url && !weddingInfo.contact.phone && !weddingInfo.contact.email },
  { id: "contact", label: "Family contact", description: "Add a phone number or email for guest enquiries.", missing: !weddingInfo.contact.phone && !weddingInfo.contact.email },
].filter((item) => item.missing)
