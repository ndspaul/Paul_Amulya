import { Component, OnInit, ElementRef } from '@angular/core';

export interface Place {
  name: string;
  tagline: string;
  description: string;
  distance: string;
  duration: string;
  imageUrl: string;
  imageAlt: string;
  mapsUrl: string;
  tags: string[];
}

@Component({
  selector: 'app-places-to-visit',
  standalone: false,
  templateUrl: './places-to-visit.html',
  styleUrl: './places-to-visit.scss',
})
export class PlacesToVisit implements OnInit {
  isVisible = false;

  places: Place[] = [
    {
      name: 'Rajiv Gandhi Beach',
      tagline: 'Godavari Riverfront Promenade',
      description:
        'A serene riverside promenade along the Godavari, dotted with sculptures including the iconic Christ the Redeemer statue and Telugu Thalli. Perfect for a peaceful morning stroll or a golden-hour boat ride on the river.',
      distance: '2 km',
      duration: '1–2 hrs',
      imageUrl: 'Yanam.jpg',
      imageAlt: 'Rajiv Gandhi Beach along the Godavari river in Yanam',
      mapsUrl: 'https://maps.google.com/?q=Rajiv+Gandhi+Beach+Yanam',
      tags: ['Beach', 'Sunset', 'Boat Ride'],
    },
    {
      name: 'Coringa Wildlife Sanctuary',
      tagline: "India's Third-Largest Mangrove Forest",
      description:
        'A breathtaking 235 sq km sanctuary of mangrove forests, creeks, and mudflats near Kakinada. Home to over 120 bird species, fishing cats, and saltwater crocodiles — a paradise for nature lovers and wildlife photographers.',
      distance: '20 km',
      duration: 'Half day',
      imageUrl: 'coringa.jpg',
      imageAlt: 'Mangrove forests of Coringa Wildlife Sanctuary near Kakinada',
      mapsUrl: 'https://maps.google.com/?q=Coringa+Wildlife+Sanctuary+Kakinada',
      tags: ['Nature', 'Wildlife', 'Mangroves'],
    },
    {
      name: 'Antarvedi Temple',
      tagline: 'Where the Godavari Meets the Sea',
      description:
        'The sacred Sri Lakshmi Narasimha Swamy Temple stands at the confluence of the Vasishta Godavari and the Bay of Bengal. The dramatic meeting of river and ocean, combined with the ancient temple, makes this a deeply spiritual and visually stunning destination.',
      distance: '55 km',
      duration: '2–3 hrs',
      imageUrl: 'Anthervedi.jpg',
      imageAlt: 'Antarvedi Sri Lakshmi Narasimha Swamy Temple at river confluence',
      mapsUrl: 'https://maps.google.com/?q=Antarvedi+Temple+Andhra+Pradesh',
      tags: ['Temple', 'Spiritual', 'Scenic'],
    },
    {
      name: 'Kakinada Harbour & Beach',
      tagline: 'Golden Sands on the Bay of Bengal',
      description:
        'A wide, golden-sand beach on the Bay of Bengal with a lively promenade, fresh seafood stalls, and stunning sunrises. The nearby Hope Island — a natural sandbar — adds a unique charm to the coastline.',
      distance: '18 km',
      duration: '2–3 hrs',
      imageUrl: 'Kakinada.jpg',
      imageAlt: 'Kakinada beach and harbour on the Bay of Bengal',
      mapsUrl: 'https://maps.google.com/?q=Kakinada+Beach+Andhra+Pradesh',
      tags: ['Beach', 'Sunrise', 'Seafood'],
    },
    {
      name: 'Rajahmundry Ghats',
      tagline: 'The Cultural Capital of Andhra',
      description:
        'The ancient city of Rajahmundry sits on the banks of the Godavari, famous for its grand Pushkar ghats, the Godavari bridge, and the Kotilingeshwara Temple. A boat ride under the iconic rail-road bridge at dusk is unforgettable.',
      distance: '65 km',
      duration: 'Full day',
      imageUrl: 'Rajahmundry.jpg',
      imageAlt: 'Godavari river and ghats at Rajahmundry',
      mapsUrl: 'https://maps.google.com/?q=Rajahmundry+Godavari+Ghats',
      tags: ['Heritage', 'River', 'Culture'],
    },
    {
      name: 'Maredumilli Forest',
      tagline: 'Waterfalls & Tribal Trails',
      description:
        'A lush eco-tourism gem in the Eastern Ghats, Maredumilli is blanketed in dense teak and bamboo forests. The Jalatharangini waterfall, tribal villages, and the Papikondalu boat cruise on the Godavari make it a perfect nature retreat.',
      distance: '130 km',
      duration: 'Full day / Overnight',
      imageUrl: 'Maredumilli.jpg',
      imageAlt: 'Dense green forests of Maredumilli in East Godavari',
      mapsUrl: 'https://maps.google.com/?q=Maredumilli+East+Godavari',
      tags: ['Forest', 'Waterfall', 'Eco-Tourism'],
    },
  ];

  constructor(private el: ElementRef) {}

  onImgError(event: Event, place: Place): void {
    const img = event.target as HTMLImageElement;
    img.classList.add('img-error');
    const wrapper = img.closest('.place-card__photo') as HTMLElement;
    if (wrapper) {
      wrapper.classList.add('has-error');
      // Set emoji fallback based on tags
      const emoji = place.tags.includes('Beach') ? '🏖️'
        : place.tags.includes('Forest') ? '🌿'
        : place.tags.includes('Temple') ? '🛕'
        : place.tags.includes('Wildlife') ? '🦜'
        : place.tags.includes('Heritage') ? '🏛️'
        : '📍';
      wrapper.setAttribute('data-fallback', emoji);
    }
  }

  ngOnInit(): void {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(this.el.nativeElement);
  }
}
