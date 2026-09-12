# Ascension Mobile Habit RPG — Master Prompt

You are designing and rebuilding a mobile-first habit RPG for iOS and Android called “Ascension”.

The app combines habit tracking, collectible cards, character progression, exploration, and personal development. Its primary visual inspiration is a collection of illustrated habit cards containing a portrait image, habit title, description, motivational quote, quote author, streak count, rarity level, and completion action.

The cards must become the central product concept. Every habit should feel like a collectible RPG card that improves as the user consistently completes it.

## Product vision

Create a calm, premium, card-based habit game where real-life progress powers a fantasy world.

Users should be able to:

- Create and complete habits
- View habits as illustrated cards
- Build streaks
- Upgrade card rarity
- Earn XP
- Improve character attributes
- Unlock equipment
- Develop themed world areas
- Review personal history and progress

The product should feel motivating and elegant rather than competitive, stressful, or cluttered.

## Recommended technology

Build the mobile application with:

- Flutter
- Dart
- Flutter Material 3
- Riverpod for state management
- Drift or Isar for local persistence
- JSON serialization
- Local notifications
- Automated unit and widget testing

Use one shared codebase for iOS and Android.

Recommended project structure:

```text
lib/
  app/
  core/
    theme/
    routing/
    storage/
    notifications/
    accessibility/
  features/
    habits/
      data/
      domain/
      presentation/
    ascension/
      data/
      domain/
      presentation/
    character/
    progress/
    settings/
  shared/
    models/
    widgets/
    animations/
```

Do not place all business logic inside UI widgets.

## Primary screens

### 1. Today

Display:

- Daily progress
- Current level
- XP progress
- Active streak
- Unfinished habit cards
- Completed habit cards
- Companion or avatar
- Motivational message
- One obvious completion action

This should be the first screen users see.

### 2. Habit cards

Create a responsive card collection with:

- Grid and list layouts
- Filtering by category, rarity, and completion status
- Sorting by streak, recent activity, rarity, or priority
- One-handed usability
- Clear visual distinction between completed and incomplete cards

### 3. Habit card detail

Show:

- Large portrait artwork
- Habit title
- Description
- Category
- Associated world area
- Completion requirement
- Quote and author
- Current streak
- Longest streak
- Completion history
- Current rarity
- XP reward
- Progress toward the next rarity
- Complete button
- Edit button
- Archive/delete controls

Use a bottom sheet or full-screen detail view on mobile.

### 4. Ascension world

Create a fantasy world divided into themed areas representing life domains:

- Serenity
- Reflection
- Vitality
- Wisdom
- Creativity
- Focus

Each area should be powered by one or more habit cards. World progress must be calculated from actual habit completion rather than separate fictional progress.

The world should enhance the habit experience without making a complex 3D environment necessary for core functionality.

### 5. Character and armory

Include:

- Character level
- XP
- Serenity attribute
- Vitality attribute
- Wisdom attribute
- Focus attribute
- Creativity attribute
- Equipped items
- Gear inventory
- Gear rarity
- Upgrade requirements
- Item descriptions and lore

Gear should be unlocked or upgraded through consistent habit progress.

### 6. Progress and history

Include:

- Calendar history
- Daily completion records
- Current and longest streaks
- Weekly summaries
- Monthly summaries
- XP history
- Rarity progression
- World-area progress

Use supportive language when habits are missed. Never shame the user.

### 7. Settings

Include:

- Notifications
- Theme selection
- Dark mode and light mode
- Accessibility options
- Reduced motion
- Data export
- Data import
- Reset progress
- Privacy information

## Habit card data model

Create one shared `HabitCard` model containing:

```text
id
title
description
category
worldAreaId
quote
quoteAuthor
imageAsset
icon
streak
longestStreak
lastCompletedAt
completionFrequency
completionRequirement
rarity
xpReward
level
isArchived
createdAt
updatedAt
completionHistory
customAccentColor
```

Do not duplicate habit definitions across screens or features.

Support predefined and user-created custom habits. Custom habits must use the same card layout, progression rules, and visual system.

## Initial habit cards

Seed the application with these example cards:

### The Bodybuilder

Category: Vitality

Description: Complete planned strength training and keep the body active.

### The Philosopher

Category: Wisdom

Description: Spend at least 30 minutes reading, studying, or listening to educational material.

### The Meditator

Category: Serenity

Description: Spend 10 minutes meditating, practicing mindfulness, breathing, or reflecting quietly.

### The Masterchef

Category: Vitality

Description: Prepare a healthy and nourishing meal from fresh ingredients.

### The Runner

Category: Vitality

Description: Raise your heart rate or complete a meaningful walking goal.

### The Musician

Category: Creativity

Description: Practice an instrument, language, artistic skill, or creative hobby.

### The Philanthropist

Category: Reflection

Description: Help someone, perform a good deed, or contribute to the community.

### The Advisor

Category: Focus

Description: Track spending or make a deliberate saving decision.

### The Strategist

Category: Focus

Description: Spend five minutes planning the most important tasks for the next day.

Each card should include suitable original artwork, a motivational quote, and an attributed quote author. Only use quotations and imagery legally and appropriately.

## Rarity progression

Use these thresholds:

- Common: 0–6 day streak
- Rare: 7–29 day streak
- Epic: 30–89 day streak
- Legendary: 90+ day streak

Rarity must be derived from the streak and displayed consistently throughout the app.

Suggested visual language:

- Common: slate or neutral
- Rare: blue
- Epic: purple
- Legendary: amber or gold

## Completion behavior

When a user completes a habit:

- Allow completion only once per configured period
- Update the streak
- Update completion history
- Award deterministic XP
- Update world-area progress
- Update character attributes
- Check for gear unlocks or upgrades
- Show a brief celebration
- Provide optional haptic feedback
- Remain fully usable with animations and sound disabled

Use the user’s local timezone when determining dates.

When a habit is missed:

- Do not shame the user
- Do not delete historical progress
- Explain the effect clearly
- Allow the user to restart
- Preserve longest-streak history

## Visual design

Base the entire design on premium illustrated habit cards:

- Portrait-oriented artwork
- Image-first layouts
- Warm neutral surfaces
- Dark fantasy and RPG accents
- Orange flame indicators for streaks
- Rounded cards with substantial spacing
- Layered borders
- Soft shadows
- Clear typography
- Strong title hierarchy
- Quotes integrated into card identity
- Consistent iconography
- Subtle press, reveal, and transition animations

Avoid:

- Dashboard-like layouts
- Excessive gradients
- Tiny text
- Overly dense screens
- Decorative elements that do not communicate meaning
- Interactions dependent on hover
- Drag-and-drop as the only interaction method

## Mobile UX requirements

- Design for small phones first
- Support tablets responsively
- Respect safe areas and notches
- Use touch targets of at least 44px
- Use bottom navigation with no more than five destinations
- Use bottom sheets where appropriate
- Support dark and light themes
- Provide loading states
- Provide useful empty states
- Support screen readers
- Provide semantic labels
- Support reduced motion
- Make core actions usable with one hand
- Confirm destructive actions
- Preserve state during navigation
- Work offline

## Persistence and migration

Use reliable local persistence so progress survives:

- App restarts
- Device rotation
- Navigation
- Temporary loss of network connectivity

Support JSON import and export for user data.

When importing older data:

- Normalize missing fields safely
- Preserve existing streaks and history
- Report malformed records clearly
- Never silently discard valid data

## Domain rules

Implement and test:

- Completion frequency rules
- Local-timezone date handling
- Streak continuation
- Streak reset behavior
- Rarity calculation
- XP calculation
- Character attribute calculation
- World-area progress
- Gear upgrade requirements
- Habit editing without data loss
- Independent reset of individual habits
- Explicit deletion confirmation

## Testing

Create:

- Unit tests for streak logic
- Unit tests for rarity transitions
- Unit tests for XP
- Unit tests for timezone handling
- Unit tests for persistence
- Widget tests for habit cards
- Widget tests for completed cards
- Widget tests for every rarity
- Widget tests for the card detail screen
- Widget tests for empty states
- Widget tests for level-up states
- Accessibility tests for core interactions

## Delivery phases

### Phase 1

Implement domain models, persistence, habit completion rules, streak calculations, rarity calculations, XP calculations, and automated tests.

### Phase 2

Implement application navigation, the theme system, shared card components, and mobile layout foundations.

### Phase 3

Implement the habit card collection, card detail screen, habit creation and editing, and completion flow.

### Phase 4

Implement Ascension world areas, world progress, and habit-to-area relationships.

### Phase 5

Implement character progression, attributes, gear, armory, XP progression, and history screens.

### Phase 6

Implement notifications, import/export, accessibility, reduced-motion support, visual polish, and release preparation.

Run formatting, static analysis, and relevant tests after every phase.

## Acceptance criteria

The application is successful when:

- A new user understands the main purpose within 30 seconds
- Completing a habit requires one obvious action
- Habit cards are the central mental model
- Cards feel collectible and meaningful
- World progress is connected to real habits
- Character and gear progression is understandable
- The app works offline
- Data survives app restarts
- The interface works on small screens
- Missed habits do not create shame or confusion
- There is one shared source of truth for habit data
- The code is typed, modular, testable, and maintainable
- The final result feels like a polished mobile game rather than a conventional task manager
