import { Subscription } from 'rxjs';

export const download = async (url: string, filename: string) => {
  return new Promise<void>((res) => {
    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', filename);
    a.click();
    res();
  });
};

// somewhere in your codebase model definitions:
export interface SubscriptionCollection {
  [key: string]: Subscription;
}

// in utilities module

export const serialUnsubscriber = (subs: SubscriptionCollection) =>
  Object.values(subs)
    .filter(
      (sub) =>
        sub instanceof Subscription && typeof sub.unsubscribe === 'function'
    )
    .forEach((sub) => sub.unsubscribe());
