import { Event } from './event.entity';

export const eventsProviders = [
  {
    provide: 'EVENTS_REPOSITORY',
    useValue: Event,
  },
];
