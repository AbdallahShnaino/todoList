import { EventGroup } from './event-group.entity';

export const eventsGroupsProviders = [
  {
    provide: 'EVENTGROUP_REPOSITORY',
    useValue: EventGroup,
  },
];
