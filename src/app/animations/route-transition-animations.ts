import {
  trigger,
  transition,
  style,
  animate,
  query,
  group,
  AnimationMetadata,
} from "@angular/animations";
/**
 * Common absolute positioning used in all transitions
 */
const fullScreenAbsolute = query(
  ":enter, :leave",
  style({
    position: "absolute",
    width: "100%",
  }),
  { optional: true }
);

/**
 * Helper for horizontal sliding transitions
 * @param leaveTransform e.g. 'translateX(-100%)'
 * @param enterTransform e.g. 'translateX(100%)'
 * @param leaveTime e.g. '200ms ease-out'
 * @param enterTime e.g. '500ms ease-out'
 */
function horizontalSlide(
  leaveTransform: string,
  enterTransform: string,
  leaveTime: string,
  enterTime: string
): AnimationMetadata {
  return group([
    query(
      ":leave",
      [
        animate(
          leaveTime,
          style({
            opacity: 0,
            transform: leaveTransform,
          })
        ),
      ],
      { optional: true }
    ),
    query(
      ":enter",
      [
        style({ transform: enterTransform, opacity: 0 }),
        animate(enterTime, style({ transform: "translateX(0)", opacity: 1 })),
      ],
      { optional: true }
    ),
  ]);
}

/**
 * Helper for scale (zoom) transitions
 * @param leaveAnimate e.g. '100ms ease-in'
 * @param leaveScale e.g. 'scale(0.9)'
 * @param enterScale e.g. 'scale(1.1)'
 * @param enterAnimate e.g. '100ms ease-out'
 */
function scaleTransition(
  leaveAnimate: string,
  leaveScale: string,
  enterScale: string,
  enterAnimate: string
): AnimationMetadata {
  return group([
    query(
      ":leave",
      [
        animate(
          leaveAnimate,
          style({
            opacity: 0,
            transform: leaveScale,
          })
        ),
      ],
      { optional: true }
    ),
    query(
      ":enter",
      [
        style({ opacity: 0, transform: enterScale }),
        animate(enterAnimate, style({ opacity: 1, transform: "scale(1)" })),
      ],
      { optional: true }
    ),
  ]);
}

export const routeTransitionAnimations = trigger("routeAnimations", [
  // home <-> tale-viewer
  transition("welcome => home", [
    fullScreenAbsolute,
    horizontalSlide(
      "translateX(-100%)",
      "translateX(100%)",
      "200ms ease-out",
      "200ms ease-out"
    ),
  ]),
  transition("home => welcome", [
    fullScreenAbsolute,
    horizontalSlide(
      "translateX(100%)",
      "translateX(-100%)",
      "200ms ease-out",
      "200ms ease-out"
    ),
  ]),

  // home <-> profile
  transition("home => profile", [
    fullScreenAbsolute,
    horizontalSlide(
      "translateX(-100%)",
      "translateX(100%)",
      "200ms ease-out",
      "200ms ease-out"
    ),
  ]),
  transition("profile => home", [
    fullScreenAbsolute,
    horizontalSlide(
      "translateX(100%)",
      "translateX(-100%)",
      "200ms ease-out",
      "200ms ease-out"
    ),
  ]),
]);
