```bash
#1
npx prisma studio
```

```bash
#2
pnpm dev
```

### FSD
- [NextJS Layers](https://feature-sliced.design/docs/guides/tech/with-nextjs)
```bash
├── pages              # NextJS pages folder
├── src
│   ├── app
│   ├── entities
│   ├── features
│   ├── pages          # FSD pages folder
│   ├── shared
│   ├── widgets
```
```bash
├── app
├── entities
├── features
├── pages              # NextJS pages folder
├── views              # Renamed FSD pages folder
├── shared
├── widgets
```
- [Exmaples/Types](https://feature-sliced.design/docs/guides/examples/types)
```ts
// shared/api/songs.ts

import type { ArtistDTO } from "./artists";

interface SongDTO {
  id: number;
  title: string;
  artist_ids: Array<ArtistDTO["id"]>;
}

export function listSongs() {
  return fetch('/api/songs').then((res) => res.json() as Promise<Array<SongDTO>>);
}
```
