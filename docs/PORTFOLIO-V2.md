# Portfolio v2 — Career Scoreboard

[Notion planning and progress](https://app.notion.com/p/3db5389c4d398165a28ee21d004131c8)

Local design prototype on `portfolio-v2`. Existing production remains on `master`.

## Direction
Sung's basketball and League of Legends interests, and Lakers/T1 fandom, inform a purple-and-gold home-court identity. Career information remains grounded in verified experience. Stats represent actual outcomes, never invented skill ratings.

## First prototype
- Stylized SVG shot, rim movement, bounce, and ball-to-screen transition.
- Four-second introductory animation with skip, Escape, session suppression, and reduced-motion support.
- Career box score, personal interests, existing project details and resume links.
- Existing archive and case studies inherit the new palette.

## Review before release
Review choreography, mobile readability, and whether the home-court feel is strong enough. This is a stylized 2D prototype; cinematic camera motion would be a subsequent iteration. Keep navigation and resume accessible without requiring animation completion.

## Source of truth
CareerOS retains verified career information. This document tracks presentation decisions. A Notion v2 planning page can link to this document without duplicating career facts.

## Interactive player-profile iteration
- Latest art direction: photo-referenced 2D cartoon replaces the geometric 3D avatar. Profile is the default tab, followed by Experience, Skills, and Projects. Profile shows Position, My strengths, and personal interests.
- Generated asset: `src/assets/sung-player-cartoon-v2.png`, using built-in image generation. Reference: user-provided basketball-game photo; only the foreground user's likeness is used.
- Final image edit prompt: Keep the illustrated man, facial likeness, outfit, shoes, pose, body proportions and full body unchanged. Change only the checkerboard background to deep purple #201426; no grid or added objects. Original generation direction: natural adult proportions, photo-referenced face and cap, gold/purple Lakers 77 uniform, basketball, Nike shoes, polished 2D editorial cartoon.

### Previous 3D exploration (retained in source)
- Hero now uses a procedural Three.js avatar in a purple/gold number 77 uniform. This is an early stylized model, not a likeness of Luka Doncic or Sung.
- Experience, Skills, Projects, and About tabs switch real career content and link to case studies.
- Recent Plays lists selected actual project updates without fabricated daily activity or dates.
- Intro prototype remains in source; the player profile is now the default home experience.
- Three.js loads separately. WebGL failure shows a static SJ/77 fallback. Avatar breathing respects reduced motion.
- Review avatar art direction, mobile proportions, and interaction in-browser before merging into master.
