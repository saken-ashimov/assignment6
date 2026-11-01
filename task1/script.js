// Task 1: Selector Detective

// Party data, ordered from left to right.
// Each room and guest includes the details used by the tasks.
const party = [
  {
    name: "Balcony",
    id: "balcony",
    floor: 2,
    guests: [
      { name: "Aigerim", color: "green",  time: "20:45", aitu: true,  things: ["cup", "crumbs"] },
      { name: "Aliya",   color: "black",  time: "21:15", aitu: false, things: ["phone", "cup"] },
      { name: "Madina",  color: "green",  time: "22:10", aitu: false, things: ["phone", "bag", "crumbs"] },
      { name: "Ivan",    color: "black",  time: "20:10", aitu: true,  things: ["cup"] }
    ]
  },
  {
    name: "Hall",
    id: "hall",
    floor: 2,
    guests: [
      { name: "Arman",   color: "yellow", time: "20:35", aitu: false, things: ["bag", "glasses"] },
      { name: "Sophia",  color: "purple", time: "21:20", aitu: true,  things: ["phone"] },
      { name: "Dias",    color: "green",  time: "19:45", aitu: true,  things: [] },
      { name: "Bekzat",  color: "purple", time: "20:55", aitu: false, things: ["bag", "cup", "crumbs"] },
      { name: "Aruzhan", color: "blue",   time: "21:50", aitu: true,  things: ["phone"] },
      { name: "Saule",   color: "green",  time: "21:25", aitu: false, things: ["glasses"] }
    ]
  },
  {
    name: "Kitchen",
    id: "kitchen",
    floor: 1,
    guests: [
      { name: "Nurlan",  color: "red",    time: "19:40", aitu: true,  things: ["phone", "cup"] },
      { name: "Emma",    color: "black",  time: "20:15", aitu: false, things: ["bag"] },
      { name: "Timur",   color: "green",  time: "21:05", aitu: true,  things: ["phone", "bag", "crumbs"] },
      { name: "Sergey",  color: "yellow", time: "20:50", aitu: false, things: [] },
      { name: "Yerlan",  color: "red",    time: "21:40", aitu: true,  things: ["glasses", "phone"] },
      { name: "Kamila",  color: "green",  time: "20:05", aitu: false, things: ["cup"] }
    ]
  },
  {
    name: "Living room",
    id: "living-room",
    floor: 1,
    guests: [
      { name: "Daniel",  color: "blue",   time: "19:55", aitu: true,  things: ["glasses"] },
      { name: "Zarina",  color: "green",  time: "21:10", aitu: false, things: ["bag", "phone", "crumbs"] },
      { name: "Natasha", color: "yellow", time: "20:30", aitu: true,  things: [] },
      { name: "Askar",   color: "black",  time: "21:00", aitu: true,  things: ["phone"] },
      { name: "Inkar",   color: "purple", time: "20:20", aitu: false, things: ["bag"] }
    ]
  }
];

// SVG icons for guest items, arrival times, and the AITU badge.
const ICONS = {
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="2" width="12" height="20" rx="2"/><line x1="11" y1="18" x2="13" y2="18"/></svg>`,
  glasses: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="14" r="4"/><circle cx="18" cy="14" r="4"/><path d="M10 14h4M2 14l2-6M22 14l-2-6"/></svg>`,
  bag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>`,
  cup: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 10h12v5a5 5 0 0 1-10 0v-5z"/><path d="M16 11h2a2 2 0 0 1 0 4h-2"/><path d="M8 4v3M12 4v3"/></svg>`,
  crumbs: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18l9-12 6 6v6H3z"/><line x1="3" y1="14" x2="18" y2="14"/><circle cx="20" cy="15" r="1" fill="currentColor"/><circle cx="21" cy="18" r="1" fill="currentColor"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg>`,
  aitu: `<svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 10l10-5 10 5-10 5-10-5z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/></svg>`
};

// Build guest cards and the page with jQuery.

// Create a guest card.
function createGuestCard(guest) {
  // Set the card classes and data attributes.
  let classNames = "guest " + guest.color;
  if (guest.aitu) {
    classNames += " aitu";
  }

  const $card = $("<div></div>")
    .addClass(classNames)
    .attr({
      "data-name": guest.name,
      "data-color": guest.color,
      "data-time": guest.time,
      "data-aitu": guest.aitu
    });

  // Add the avatar (uses local original avatar with automatic DiceBear fallback).
  const avatarUrl = "../avatars/" + guest.name + ".png";
  const fallbackUrl = "https://api.dicebear.com/9.x/open-peeps/svg?facialHairProbability=0&seed=" + guest.name;
  const $avatarWrap = $('<div class="avatar-wrap"></div>');
  const $img = $('<img class="avatar">')
    .attr({
      src: avatarUrl,
      alt: guest.name
    })
    .on("error", function () {
      $(this).off("error").attr("src", fallbackUrl);
    });
  $avatarWrap.append($img);

  // Add the AITU badge when needed.
  if (guest.aitu) {
    const $badge = $('<span class="aitu-badge" title="AITU student"></span>').html(ICONS.aitu);
    $avatarWrap.append($badge);
  }

  // Add the guest name and arrival time.
  const $name = $('<div class="guest-name"></div>').text(guest.name);
  const $time = $('<div class="guest-time"></div>')
    .html(ICONS.clock)
    .append($("<span></span>").text(guest.time));

  // Add the guest's items.
  const $things = $('<div class="things"></div>');
  for (let i = 0; i < guest.things.length; i++) {
    const item = guest.things[i];
    const $thingIcon = $("<span></span>")
      .addClass("thing " + item)
      .attr("data-thing", item)
      .attr("title", item)
      .html(ICONS[item]);
    $things.append($thingIcon);
  }

  $card.append($avatarWrap, $name, $time, $things);
  return $card;
}

// Build the house from the party data.
function buildPage() {
  const $house = $("#house");
  $house.empty();

  // Add the second floor first, then the first floor.
  const floors = [2, 1];

  for (let f = 0; f < floors.length; f++) {
    const floorNum = floors[f];

    const $floor = $('<div class="floor"></div>')
      .attr("id", "floor-" + floorNum)
      .attr("data-floor", floorNum);

    const $label = $('<div class="floor-label"></div>').text("FLOOR " + floorNum);
    const $roomsWrap = $('<div class="floor-rooms"></div>');

    // Add this floor's rooms.
    for (let r = 0; r < party.length; r++) {
      const room = party[r];
      if (room.floor === floorNum) {
        const $room = $('<div class="room"></div>')
          .attr("id", room.id)
          .attr("data-name", room.name);

        const $header = $('<div class="room-header"></div>').append(
          $('<h3 class="room-title"></h3>').text(room.name)
        );

        const $guestsContainer = $('<div class="guests"></div>');

        for (let g = 0; g < room.guests.length; g++) {
          $guestsContainer.append(createGuestCard(room.guests[g]));
        }

        $room.append($header, $guestsContainer);
        $roomsWrap.append($room);
      }
    }

    $floor.append($label, $roomsWrap);
    $house.append($floor);
  }
}

// Tasks 1-20.

const cases = [
  {
    id: 1,
    question: "Who is in the hall?",
    chainText: '$("#hall .guest")',
    run: function () {
      return $("#hall .guest");
    }
  },
  {
    id: 2,
    question: "Who is dressed in yellow or purple?",
    chainText: '$(".guest.yellow, .guest.purple")',
    run: function () {
      return $(".guest.yellow, .guest.purple");
    }
  },
  {
    id: 3,
    question: "Which AITU students are upstairs?",
    chainText: '$("#floor-2 .guest.aitu")',
    run: function () {
      return $("#floor-2 .guest.aitu");
    }
  },
  {
    id: 4,
    question: "Who has glasses or a bag?",
    chainText: '$(".guest:has(.glasses, .bag)")',
    run: function () {
      return $(".guest:has(.glasses, .bag)");
    }
  },
  {
    id: 5,
    question: "Who came with nothing at all?",
    chainText: '$(".guest:not(:has(.thing))")',
    run: function () {
      return $(".guest:not(:has(.thing))");
    }
  },
  {
    id: 6,
    question: "Who has a phone but no bag?",
    chainText: '$(".guest:has(.phone):not(:has(.bag))")',
    run: function () {
      return $(".guest:has(.phone):not(:has(.bag))");
    }
  },
  {
    id: 7,
    question: "Who arrived between 20:30 and 21:00, both times included?",
    chainText: '$(".guest").filter(function () { const t = $(this).attr("data-time"); return t >= "20:30" && t <= "21:00"; })',
    run: function () {
      return $(".guest").filter(function () {
        const t = $(this).attr("data-time");
        return t >= "20:30" && t <= "21:00";
      });
    }
  },
  {
    id: 8,
    question: "Who arrived after 21:00 and is not an AITU student?",
    chainText: '$(".guest:not(.aitu)").filter(function () { return $(this).attr("data-time") > "21:00"; })',
    run: function () {
      return $(".guest:not(.aitu)").filter(function () {
        return $(this).attr("data-time") > "21:00";
      });
    }
  },
  {
    id: 9,
    question: "Who stands right next to Askar?",
    chainText: '$(".guest[data-name=\'Askar\']").prev().add($(".guest[data-name=\'Askar\']").next())',
    run: function () {
      return $(".guest[data-name='Askar']").prev().add($(".guest[data-name='Askar']").next());
    }
  },
  {
    id: 10,
    question: "Who stands last in each room?",
    chainText: '$(".guest:last-child")',
    run: function () {
      return $(".guest:last-child");
    }
  },
  {
    id: 11,
    question: "Who stands third in each room?",
    chainText: '$(".guest:nth-child(3)")',
    run: function () {
      return $(".guest:nth-child(3)");
    }
  },
  {
    id: 12,
    question: "Who stands after Timur in his room?",
    chainText: '$(".guest[data-name=\'Timur\']").nextAll()',
    run: function () {
      return $(".guest[data-name='Timur']").nextAll();
    }
  },
  {
    id: 13,
    question: "Who stands right before someone in black?",
    chainText: '$(".guest.black").prev()',
    run: function () {
      return $(".guest.black").prev();
    }
  },
  {
    id: 14,
    question: "In which room is Aruzhan?",
    chainText: '$(".guest[data-name=\'Aruzhan\']").closest(".room")',
    run: function () {
      return $(".guest[data-name='Aruzhan']").closest(".room");
    }
  },
  {
    id: 15,
    question: "Which rooms have fewer than 6 guests?",
    chainText: '$(".room").filter(function () { return $(this).find(".guest").length < 6; })',
    run: function () {
      return $(".room").filter(function () {
        return $(this).find(".guest").length < 6;
      });
    }
  },
  {
    id: 16,
    question: "In which rooms does somebody have a cup, but nobody wears glasses?",
    chainText: '$(".room:has(.cup):not(:has(.glasses))")',
    run: function () {
      return $(".room:has(.cup):not(:has(.glasses))");
    }
  },
  {
    id: 17,
    question: "Who came first to each room?",
    chainText: '$(".guest").filter(function () { const t = $(this).attr("data-time"); return $(this).siblings().filter(function () { return $(this).attr("data-time") < t; }).length === 0; })',
    run: function () {
      return $(".guest").filter(function () {
        const t = $(this).attr("data-time");
        return $(this).siblings().filter(function () {
          return $(this).attr("data-time") < t;
        }).length === 0;
      });
    }
  },
  {
    id: 18,
    question: "Miras, an AITU student in blue, comes at 21:20 with his phone and joins Askar and Inkar, standing between them. Let him appear smoothly.",
    chainText: 'createGuestCard({ name: "Miras", color: "blue", time: "21:20", aitu: true, things: ["phone"] }).hide().insertAfter(".guest[data-name=\'Askar\']").fadeIn(600)',
    run: function () {
      return createGuestCard({
        name: "Miras",
        color: "blue",
        time: "21:20",
        aitu: true,
        things: ["phone"]
      }).hide().insertAfter(".guest[data-name='Askar']").fadeIn(600);
    }
  },
  {
    id: 19,
    question: "Natasha says goodbye and goes home. Her card fades away and disappears from the page.",
    chainText: '$(".guest[data-name=\'Natasha\']").fadeOut(600, function () { $(this).remove(); })',
    run: function () {
      return $(".guest[data-name='Natasha']").fadeOut(600, function () {
        $(this).remove();
      });
    }
  },
  {
    id: 20,
    question: "Who took the cake? The thief was downstairs, came after 21:00 but before the cake disappeared, has crumbs but no cup, and stood right next to an AITU student.",
    chainText: '$("#floor-1 .guest.aitu").prev().add($("#floor-1 .guest.aitu").next()).filter(":has(.crumbs):not(:has(.cup))").filter(function () { const t = $(this).attr("data-time"); return t > "21:00" && t < "21:30"; })',
    run: function () {
      return $("#floor-1 .guest.aitu")
        .prev()
        .add($("#floor-1 .guest.aitu").next())
        .filter(":has(.crumbs):not(:has(.cup))")
        .filter(function () {
          const t = $(this).attr("data-time");
          return t > "21:00" && t < "21:30";
        });
    }
  }
];

// Run a task, highlight matches, and show their names.

function runCase(caseObj) {
  // Rebuild the page before each task.
  buildPage();

  // Run the task's jQuery chain.
  const $found = caseObj.run();

  // Get the names of the matching guests or rooms.
  const names = [];
  $found.each(function () {
    names.push($(this).attr("data-name"));
  });

  // The chain found rooms (tasks 14-16).
  if ($found.hasClass("room")) {
    $found.addClass("highlight-room");
    // Highlight and animate guests in those rooms.
    $found.find(".guest")
      .addClass("highlight")
      .animate({ top: "-14px" }, 160)
      .animate({ top: "0px" }, 160);
  } else {
    // The chain found guests.
    $found.addClass("highlight");

    // Skip the jump animation before Natasha fades out in task 19.
    if (caseObj.id !== 19) {
      $found
        .animate({ top: "-14px" }, 160)
        .animate({ top: "0px" }, 160);
    }
  }

  // Show the question, count, names, and jQuery chain.
  $("#result-question").text("Case " + caseObj.id + ": " + caseObj.question);
  $("#result-names").text("Found (" + names.length + "): " + names.join(", "));
  $("#result-chain").text(caseObj.chainText);
}

// Initialize the page.

$(function () {
  // Add icons to the legend.
  $("#leg-phone").html(ICONS.phone);
  $("#leg-glasses").html(ICONS.glasses);
  $("#leg-bag").html(ICONS.bag);
  $("#leg-cup").html(ICONS.cup);
  $("#leg-crumbs").html(ICONS.crumbs);
  $("#leg-clock").html(ICONS.clock);
  $("#leg-aitu").html(ICONS.aitu);

  // Build the house.
  buildPage();

  // Add buttons for all 20 tasks.
  const $btnContainer = $("#case-buttons");
  for (let i = 0; i < cases.length; i++) {
    const c = cases[i];
    const $btn = $('<button type="button" class="case-btn"></button>');
    if (c.id === 20) {
      $btn.addClass("thief-btn");
    }

    $btn.append(
      $('<span class="case-num"></span>').text("#" + c.id),
      $('<span class="case-text"></span>').text(c.question)
    );

    // Handle clicks with jQuery.
    $btn.on("click", function () {
      $(".case-btn").removeClass("active");
      $(this).addClass("active");
      runCase(c);
    });

    $btnContainer.append($btn);
  }
});
