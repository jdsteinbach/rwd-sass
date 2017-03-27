# Keeping RWD Simple and Sassy

## Introduction

### RWD: the New Normal

There's no going back now: responsive web design is the new normal. Content parity across devices is the best way to serve our users and all of us who build the web build with for multiple screen sizes.

---

Responsive design comes with a lot of complications, however: managing consistent breakpoints across a project, tracking all the styles that need to change across those breakpoints, and keeping all the responsive code clean and organized, to name a few.

---

Using Sass (or a similar preprocessor), we can standardize our breakpoints, automate much of the repetitive code, and organize individual styles well. In this talk, we’ll look at several Sass techniques and tools for managing responsive CSS.

---

*Note: I'm a big fan of Sass, but I know some of you use Less or Stylus (or your own home-brewed or PostCSS-based preprocessor), so I'm going to emphasize techniques over specific tools.*

## Organization

### Single Source of Truth

There's a principle in data organization and programming called "Single Source of Truth." It means that ideally, a system should only define a piece of data once, then all other references to that data should refer back to the original/canonical definition. While this principle originally described data structures and databases primarily, it does apply to style organization. For example, if you use a specific shade of blue throughout a site, it's best to define that color once (as a variable) and use the variable throughout the rest of your style codebase. You may have heard this same principle explained with the acronym "DRY" - Don't Repeat Yourself.

---

One clarification on SSoT: this principle does not mean that you never ever type the same value or string twice. This principle applies to data that's repeated "because it's meant to be the same." However, sometimes data points are identical but not on purpose. The height of a site's fixed header might be `80px` (or `5rem` if you like that better) and the page title font-size may be the same size. However, that's not necessarily because they **must** be the same size. SSOT/DRY doesn't mean you have to force identical values into a single variable.

### Naming Things Well

The key to maintainability is consistency. If you need to find and change some code quickly, things have to be named consistently. Let me suggest a naming pattern that'll help with consistency: the words in your variable and file names should go from broad to narrow.

#### Name Things Consistently

**Naming Variables**

```scss
// Avoid this:
$blue-color:      #0074D9;
$dark-blue-color: #001f3f; // eeny
$blue-dark-color: #001f3f; // meeny
$blue-color-dark: #001f3f; // miney mo
$red-color:       #ff4136;

// Do this:
$color-blue:      #0074D9;
$color-blue-dark: #001f3f;
$color-red:       #ff4136;
```

```scss
// Avoid this:
$normal-border: 1px solid $color-gray-light;
$fancy-border:  1px solid $color-blue;

// Do this:
$border-normal: 1px solid $color-gray-light;
$border-fancy:  1px solid $color-blue;
```

**Naming Files**

```
// Cluttered
|–  modules/
|   |–  _block-table.scss
|   |–  _siteheader.scss
|   |–  _4column-block.scss
|   |–  _footer.scss
|   |–  _menus.scss
|   `–  _mobile-nav.scss
|–  reset/
|   `–  _reset.scss
`–  style.scss

// Better
|–  blocks/
|   |–  _block-table.scss
|   `–  _block-columns-4.scss
|–  shared/
|   |–  _site-header.scss
|   |–  _site-footer.scss
|   |–  _nav.scss
|   `–  _nav-mobile.scss
|–  reset/
|   `–  _reset.scss
`–  style.scss
```

#### Name Things Clearly

Things have to be named clearly as well. You'll often seen developers using all manner of abbreviations for their variables and files. Shorter names might be quicker to type as you create a new codebase, but they're a lot less useful when you need to understand the existing code for a maintenance request later. We often spend a month or two building a site, then a year or more maintaining it. Don't make the long-term maintenance hard for the sake of typing fewer characters while you build the site.

---

**Naming Variables**

```scss
// Harder to read / maintain
$c-bl-dk: #001f3f;
$c-rd-lt: lighten(#ff4136, 25%);
$c-gr:    #3d9970;

// Easier to read / maintain
$color-blue-dark: #001f3f;
$color-red-light: lighten(#FF4136, 25%);
$color-green:     #3D9970;
```

---

**Naming Files**

```
// Mysterious
|–  modules/
|   |–  _b-table.scss
|   |–  _s-header.scss
|   |–  _4c-b.scss
|   |–  _ft.scss
|   |–  _m.scss
|   `– _mob-nav.scss
|–  reset/
|   `– _reset.scss
`–  style.scss

// Clearer
|–  blocks/
|   |–  _block-table.scss
|   |–  _block-columns-4.scss
|–  shared/
|   |–  _site-header.scss
|   |–  _site-footer.scss
|   |–  _nav.scss
|   `– _nav-mobile.scss
|–  reset/
|   `– _reset.scss
`–  style.scss
```

### Making Big Things Small

Using a preprocessor means you no longer need to deal with 1000s of lines of CSS in a single file. (You'll still compile everything to a single CSS file, but you won't have to maintain directly.)

Let's talk about how to organize your preprocessor partials. Credit for this pattern goes to Hugo Giraudel's [Sass Guidelines site](http://sass-guidelin.es/#the-7-1-pattern).

```
// 7-1 Sass Folder Pattern
sass/
|–  abstracts/
|–  base/
|–  components/
|–  layout/
|–  pages/
|–  themes/
|–  vendors/
`–  main.scss
```

```
sass/
|–  abstracts/
|   |–  _variables.scss    # Sass Variables
|   |–  _functions.scss    # Sass Functions
|   |–  _mixins.scss       # Sass Mixins
|   `–  _placeholders.scss # Sass Placeholders
|
|–  base/
|   |–  _reset.scss        # Reset/normalize
|   |–  _typography.scss   # Typography rules
|   …                     # Etc.
|
|–  components/
|   |–  _buttons.scss      # Buttons
|   |–  _carousel.scss     # Carousel
|   |–  _cover.scss        # Cover
|   |–  _dropdown.scss     # Dropdown
|   …                     # Etc.
|
|–  layout/
|   |–  _navigation.scss   # Navigation
|   |–  _grid.scss         # Grid system
|   |–  _header.scss       # Header
|   |–  _footer.scss       # Footer
|   |–  _sidebar.scss      # Sidebar
|   |–  _forms.scss        # Forms
|   …                     # Etc.
|
|–  pages/
|   |–  _home.scss         # Home specific styles
|   |–  _contact.scss      # Contact specific styles
|   …                     # Etc.
|
|–  themes/
|   |–  _theme.scss        # Default theme
|   |–  _admin.scss        # Admin theme
|   …                     # Etc.
|
|–  vendors/
|   |–  _bootstrap.scss    # Bootstrap
|   |–  _jquery-ui.scss    # jQuery UI
|   …                     # Etc.
|
`–  main.scss              # Main Sass file
```

* **Abstracts:** variables, mixins, functions, placeholders
* **Vendors:** code libraries from other sources like grid helpers, mixin libraries, etc
* **Base:** boilerplate stuff like reset, typography
* **Layouts:** macro (wireframe) page parts like header, footer, grid
* **Components:** smaller, reusable components like widgets, media, thumbnails
* **Pages:** page-specific styles
* **Themes:** specific theme variations (not common on small/medium sites)

## Responsive Sass Techniques

### Media Queries

I know, we're working with some bedrock basics: managing repeated values with variables. Assign any repeated value to a variable. The biggest improvements are: 1) you don't have to look up that value every time you want to use it again and 2) you can change that value across the entire codebase by editing the variable just once. This is a practical way to apply the programming principle of having a "single source of truth" for these values.

```scss
$breakpoint-medium: 25em;
$breakpoint-large:  50em;
```

Sass variables aren't limited to simple string storage, however: they can also be maps (or associative arrays):

```scss
$breakpoints: (
  default: null,
  medium: 25em,
  large: 50em
);
```

Now if you want to write a media query in Sass, you can stick with your defined breakpoints like this:

```scss
.element {
  @media screen and (min-width: $breakpoint-medium) {
    width: 50%;
  }
}
```

Or if you've put your breakpoints in a map:

```scss
.element {
  @media screen and (min-width: map-get($breakpoints, medium)) {
    width: 50%;
  }
}
```

#### MQ Mixin

Now, that's still a lot to type, so let's create a mixin to make the whole MQ syntax fast and reusable:

```scss
@mixin breakpoint($label) {
  @if map-get($breakpoints, $label) {
    @media screen and (min-width: map-get($breakpoints, medium)) {
      @content;
    }
  } @else {
    @content;
  }
}

.element {
  @include breakpoint(medium) {
    width: 50%;
  }
}
```

*Note: That mixin will fail silently. If you pass it a key that doesn't exist in `$breakpoints`, it'll just output the `@content` CSS with no media query. Read [jds.li/validsass](http://jds.li/validsass) for more information on validating input for Sass mixins & functions.*

#### Breakpoints vs. Tweakpoints

You may have seen Jeremy Keith's article on "Tweakpoints" recently: [jds.li/tweakpoints](http://jds.li/tweakpoints). Tweakpoints are like breakpoints for a design, but not as "major." You're probably already used to having 3 or 4 major layout-changing breakpoints for a site. You've probably also felt the pain of having a few odd components that don't seem to "break" nicely at your primary breakpoints. Tweakpoints are "sub-breakpoints" for individual parts of the site that need a slightly-adjusted breakpoint.

You can handle tweakpoints a couple different ways. You could be strict and say, "They're not as important as breakpoints, so they'll be stored in their own map." In that scenario, you'll then need to either (a) write a `tweakpoint()` version of the breakpoint mixin, or (b) modify your breakpoint mixin so that it can handle tweakpoints too. If you like option (b), read [jds.li/tpointsass](http://jds.li/tpointsass) for a tutorial on how to scope tweakpoints to each Sass partial.

The other way to handle tweakpoints is to decide, "I don't care that they're not as important as breakpoints. I'll put them in the same map anyway and that's fine." The downside of this approach is that all the tweakpoints are available to the entire codebase, instead of being scoped to the style patterns that actually need them.

#### Custom Breakpoints per Partial

I'm actually going to step back from that `breakpoint()` mixin we've been looking at and away from the idea of storing all your breakpoints in a map. If you're used to storing them all in variables, there are a couple Sass libraries you can use to handle the mixins for you.

#### Scattered Media Queries vs. MQ Partials

### Typography

You might recall our `$breakpoints` map from above. Let's combine that with 2 other maps to automate some responsive typography.

```scss
$breakpoints: (
  default: null,
  medium: 25em,
  large: 50em
);
```

```scss
$font-sizes: (
  default: 1rem,
  medium:  1.2rem,
  large:   1.4rem
);
```

```scss
$line-heights: (
  default: 1.5,
  medium:  1.6,
  large:   1.6
);
```

You'll use the function `map-get()` to retrieve values from a map. This is the Sass equivalent of `array['key']` / `array.key` in JS or `$array['key']`in PHP.

```scss
$breakpoint-medium: map-get($breakpoints, medium);
```

```scss
$font-size-default: map-get($font-sizes, default);
```

```scss
$line-height-large: map-get($line-heights, large);
```

I mentioned earlier we'd be able to loop through a map (an advantage over a series of variables). Here's a practical example. Let's create some quick responsive typography with the three maps we just saw a moment ago. For each breakpoint (default, medium, large), we're going to set the base font-size & line-height on the `body` element.

```scss
body {
  @each $label, $min-width in $breakpoints {
    @if ( $min-width ) {
      @media screen and (min-width: $min-width) {
        font-size: map-get($font-sizes, $label);
        line-height: map-get($line-heights, $label);
      }
    } @else {
      font-size: map-get($font-sizes, $label);
      line-height: map-get($line-heights, $label);
    }
  }
}
```

And now we get responsive base typography:

```css
body {
  font-size: 1rem;
  line-height: 1.5;
}
@media screen and (min-width: 25em) {
  body {
    font-size: 1.2rem;
    line-height: 1.6;
  }
}
@media screen and (min-width: 50em) {
  body {
    font-size: 1.4rem;
    line-height: 1.6;
  }
}
```

One thing you probably noticed above was the `@if` / `@else` logic we had to put in our loop and the duplicated output properties. If we take the media query part and use a mixin (a type of function in Sass), we can clean that up so that our loop is consistent.

```scss
@mixin breakpoint($name) {
  @if $name == 'default' {
    @content;
  } @else if not index(map-keys($breakpoints), $name) {
    @warn "Invalid breakpoint `#{$name}`.";
  } @else {
    @media screen and (min-width: map-get($breakpoints, $name)) {
      @content;
    }
  }
}
```

```scss
body {
  @each $label, $min-width in $breakpoints {
    @include breakpoint($label) {
      font-size: map-get($font-sizes, $label);
      line-height: map-get($line-heights, $label);
    }
  }
}
```

### Partials

## Sass Tools

### Breakpoint (MQs)

### Susy (math & grids)