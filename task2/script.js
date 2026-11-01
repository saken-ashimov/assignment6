// Task 2: Party in Motion

// Party data. It is updated when a guest moves.
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

const ICONS = {
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="2" width="12" height="20" rx="2"/><line x1="11" y1="18" x2="13" y2="18"/></svg>`,
  glasses: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="14" r="4"/><circle cx="18" cy="14" r="4"/><path d="M10 14h4M2 14l2-6M22 14l-2-6"/></svg>`,
  bag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>`,
  cup: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 10h12v5a5 5 0 0 1-10 0v-5z"/><path d="M16 11h2a2 2 0 0 1 0 4h-2"/><path d="M8 4v3M12 4v3"/></svg>`,
  crumbs: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18l9-12 6 6v6H3z"/><line x1="3" y1="14" x2="18" y2="14"/><circle cx="20" cy="15" r="1" fill="currentColor"/><circle cx="21" cy="18" r="1" fill="currentColor"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg>`,
  aitu: `<svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 10l10-5 10 5-10 5-10-5z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/></svg>`
};

// Tracks the open guest popup.
let $activePopup = null;
let $activeGuestEl = null;

// Build the page and guest cards.

function createGuestCard(guest, origIndex) {
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
      "data-aitu": guest.aitu,
      "data-things": guest.things.join(","),
      "data-orig-index": origIndex !== undefined ? origIndex : 99
    });

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

  if (guest.aitu) {
    const $badge = $('<span class="aitu-badge" title="AITU student"></span>').html(ICONS.aitu);
    $avatarWrap.append($badge);
  }

  const $name = $('<div class="guest-name"></div>').text(guest.name);
  const $time = $('<div class="guest-time"></div>')
    .html(ICONS.clock)
    .append($("<span></span>").text(guest.time));

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

// Update the guest order in a room.
function updateRoomIndices($room) {
  $room.find(".guests .guest").each(function (idx) {
    $(this).attr("data-orig-index", idx);
  });
}

function buildPage() {
  // Clear unfinished moves and popups before rebuilding.
  $(".guest-popup-card, .flying-guest, .guest-slot").stop(true, true).remove();
  $activePopup = null;
  $activeGuestEl = null;

  const $house = $("#house");
  $house.empty();

  const floors = [2, 1];

  for (let f = 0; f < floors.length; f++) {
    const floorNum = floors[f];

    const $floor = $('<div class="floor"></div>')
      .attr("id", "floor-" + floorNum)
      .attr("data-floor", floorNum);

    const $label = $('<div class="floor-label"></div>').text("FLOOR " + floorNum);
    const $roomsWrap = $('<div class="floor-rooms"></div>');

    for (let r = 0; r < party.length; r++) {
      const room = party[r];
      if (room.floor === floorNum) {
        const $room = $('<div class="room"></div>')
          .attr("id", room.id)
          .attr("data-name", room.name)
          .attr("data-sorted", "false");

        const $sortBtn = $('<button type="button" class="sort-btn">Sort by time</button>');
        const $header = $('<div class="room-header"></div>').append(
          $('<h3 class="room-title"></h3>').text(room.name),
          $sortBtn
        );

        const $guestsContainer = $('<div class="guests"></div>');

        for (let g = 0; g < room.guests.length; g++) {
          $guestsContainer.append(createGuestCard(room.guests[g], g));
        }

        $room.append($header, $guestsContainer);
        $roomsWrap.append($room);
      }
    }

    $floor.append($label, $roomsWrap);
    $house.append($floor);
  }
}

// Task 2: Guest popup

// Describe the guest's items.
function formatThingsText(thingsStr) {
  if (!thingsStr) {
    return "Came with nothing";
  }
  const map = {
    phone: "a phone",
    glasses: "glasses",
    bag: "a bag",
    cup: "a cup",
    crumbs: "cake crumbs"
  };
  const items = thingsStr.split(",");
  const words = [];
  for (let i = 0; i < items.length; i++) {
    words.push(map[items[i]] || items[i]);
  }
  if (words.length === 1) {
    return "Has " + words[0];
  }
  if (words.length === 2) {
    return "Has " + words[0] + " and " + words[1];
  }
  return "Has " + words.slice(0, -1).join(", ") + " and " + words[words.length - 1];
}

// Close the open popup.
function closeGuestPopup(immediate) {
  if (!$activePopup) {
    return;
  }

  const $popupToClose = $activePopup;
  const $guestToReturn = $activeGuestEl;
  $activePopup = null;
  $activeGuestEl = null;

  // Stop the current animation to handle quick clicks.
  $popupToClose.stop(true, false);

  if (immediate || !$guestToReturn || !$guestToReturn.closest("body").length) {
    $popupToClose.remove();
    return;
  }

  const $avatar = $guestToReturn.find(".avatar-wrap");
  const off = $avatar.offset();
  const w = $avatar.outerWidth();
  const h = $avatar.outerHeight();

  $popupToClose.animate(
    {
      top: off.top + "px",
      left: off.left + "px",
      width: w + "px",
      height: h + "px",
      opacity: 0
    },
    220,
    function () {
      $(this).remove();
    }
  );
}

// Open a guest popup.
function openGuestPopup($guestEl) {
  // Clicking the open guest closes the popup.
  if ($activeGuestEl && $activeGuestEl.is($guestEl)) {
    closeGuestPopup(false);
    return;
  }

  // Close any other open popup.
  if ($activePopup) {
    // Remove old popups to avoid animation queues.
    $(".guest-popup-card").not($activePopup).stop(true, true).remove();
    closeGuestPopup(false);
  }

  const name = $guestEl.attr("data-name");
  const color = $guestEl.attr("data-color");
  const time = $guestEl.attr("data-time");
  const isAitu = $guestEl.attr("data-aitu") === "true";
  const thingsStr = $guestEl.attr("data-things") || "";
  const currentRoomId = $guestEl.closest(".room").attr("id");

  const avatarUrl = "../avatars/" + name + ".png";
  const fallbackUrl = "https://api.dicebear.com/9.x/open-peeps/svg?facialHairProbability=0&seed=" + name;

  // Create the popup.
  const $popup = $('<div class="guest-popup-card"></div>');
  const $inner = $('<div class="popup-inner"></div>');

  const $closeBtn = $('<button type="button" class="popup-close" title="Close (Esc)">✕</button>');
  $closeBtn.on("click", function () {
    closeGuestPopup(false);
  });

  const $avatarBox = $('<div class="popup-avatar"></div>').addClass(color);
  $avatarBox.append(
    $("<img>")
      .attr("src", avatarUrl)
      .attr("alt", name)
      .on("error", function () {
        $(this).off("error").attr("src", fallbackUrl);
      })
  );
  if (isAitu) {
    $avatarBox.append($('<span class="aitu-badge"></span>').html(ICONS.aitu));
  }

  const $title = $('<div class="popup-name"></div>').text(name);

  // Add the guest details.
  const $infoList = $('<ul class="popup-info-list"></ul>');
  $infoList.append($("<li></li>").text("🕒 Came at " + time));
  $infoList.append($("<li></li>").text(isAitu ? "🎓 AITU student" : "👤 Not an AITU student"));
  $infoList.append($("<li></li>").text("👕 Dressed in " + color));
  $infoList.append($("<li></li>").text("🎒 " + formatThingsText(thingsStr)));

  // Add buttons to move the guest to another room.
  const $movesBox = $('<div class="popup-moves"></div>');
  for (let i = 0; i < party.length; i++) {
    const r = party[i];
    if (r.id !== currentRoomId) {
      const $moveBtn = $('<button type="button" class="move-btn"></button>')
        .text("Move to the " + r.name.toLowerCase());

      $moveBtn.on("click", function () {
        moveGuestToRoom($guestEl, r.id);
      });

      $movesBox.append($moveBtn);
    }
  }

  $inner.append($closeBtn, $avatarBox, $title, $infoList, $movesBox);
  $popup.append($inner).appendTo("body");

  // Get the popup size.
  const fullW = $inner.outerWidth();
  const fullH = $inner.outerHeight();

  // Start at the guest's avatar.
  const $avatar = $guestEl.find(".avatar-wrap");
  const startOff = $avatar.offset();
  const startW = $avatar.outerWidth();
  const startH = $avatar.outerHeight();

  // Place the popup near the center of the screen.
  const winW = $(window).width();
  const scrollTop = $(window).scrollTop();
  const winH = $(window).height();

  let targetLeft = startOff.left + startW / 2 - fullW / 2;
  if (targetLeft < 16) targetLeft = 16;
  if (targetLeft + fullW > winW - 16) targetLeft = winW - fullW - 16;

  let targetTop = startOff.top - 30;
  if (targetTop < scrollTop + 16) targetTop = scrollTop + 16;
  if (targetTop + fullH > scrollTop + winH - 16) {
    targetTop = Math.max(scrollTop + 16, scrollTop + winH - fullH - 16);
  }

  $activePopup = $popup;
  $activeGuestEl = $guestEl;

  // Animate the popup open.
  $popup
    .css({
      top: startOff.top + "px",
      left: startOff.left + "px",
      width: startW + "px",
      height: startH + "px",
      opacity: 0.2
    })
    .animate(
      {
        top: targetTop + "px",
        left: targetLeft + "px",
        width: fullW + "px",
        height: fullH + "px",
        opacity: 1
      },
      260
    );
}

// Task 3: Move a guest

function moveGuestToRoom($guestEl, targetRoomId) {
  // Finish any previous moves.
  $(".flying-guest, .guest-slot").stop(true, true);

  // Close the popup.
  closeGuestPopup(true);

  const $oldRoom = $guestEl.closest(".room");
  const oldRoomId = $oldRoom.attr("id");
  const $targetRoom = $("#" + targetRoomId);

  if (!oldRoomId || oldRoomId === targetRoomId || $guestEl.attr("data-moving") === "true") {
    return;
  }

  $guestEl.attr("data-moving", "true");
  $guestEl.stop(true, true).css({ top: "0px", left: "0px" });

  const guestName = $guestEl.attr("data-name");

  // Update party data so the guest is in the new room.
  let movedGuestObj = null;
  for (let i = 0; i < party.length; i++) {
    if (party[i].id === oldRoomId) {
      for (let j = 0; j < party[i].guests.length; j++) {
        if (party[i].guests[j].name === guestName) {
          movedGuestObj = party[i].guests.splice(j, 1)[0];
          break;
        }
      }
    }
  }
  if (movedGuestObj) {
    for (let i = 0; i < party.length; i++) {
      if (party[i].id === targetRoomId) {
        party[i].guests.push(movedGuestObj);
        break;
      }
    }
  }

  // Get the guest card's starting position.
  const startOff = $guestEl.offset();
  const cardW = $guestEl.outerWidth();
  const cardH = $guestEl.outerHeight();

  const $targetGuests = $targetRoom.find(".guests");

  // Add an empty slot at the end of the new room.
  const $lastExisting = $targetGuests.children(".guest:visible").last();
  const $newSlot = $('<div class="guest-slot"></div>').css({
    width: cardW + "px",
    height: cardH + "px"
  });
  $targetGuests.append($newSlot);

  // Get the new slot position and check if it wrapped onto a new row.
  const targetOff = $newSlot.offset();
  const wrappedToNewRow = $lastExisting.length > 0 && (targetOff.top > $lastExisting.offset().top + 20);
  if (wrappedToNewRow) {
    $newSlot.css({ width: cardW + "px", height: "0px" });
  } else {
    $newSlot.css({ width: "0px", height: cardH + "px" });
  }

  // Add a slot where the guest was.
  const $oldSlot = $('<div class="guest-slot"></div>').css({
    width: cardW + "px",
    height: cardH + "px"
  });
  $guestEl.after($oldSlot);
  $guestEl.hide().appendTo($targetGuests);

  // Create a copy of the guest card to animate.
  const $flyer = $guestEl
    .clone()
    .removeClass("guest")
    .show()
    .addClass("flying-guest")
    .css({
      position: "absolute",
      top: startOff.top + "px",
      left: startOff.left + "px",
      width: cardW + "px",
      height: cardH + "px",
      margin: 0,
      zIndex: 999
    })
    .appendTo("body");

  // Reset sort button state on both rooms after a move.
  $oldRoom.attr("data-sorted", "false").find(".sort-btn").removeClass("sorted").text("Sort by time");
  $targetRoom.attr("data-sorted", "false").find(".sort-btn").removeClass("sorted").text("Sort by time");

  // Run all three animations at the same time:
  // - Close the old slot.
  // - Open the new slot.
  // - Move the card to the new room.
  $oldSlot.animate({ width: "0px" }, 450, function () {
    $(this).remove();
    updateRoomIndices($oldRoom);
  });

  if (wrappedToNewRow) {
    $newSlot.animate({ height: cardH + "px" }, 450);
  } else {
    $newSlot.animate({ width: cardW + "px" }, 450);
  }

  $flyer.animate(
    {
      top: targetOff.top + "px",
      left: targetOff.left + "px"
    },
    450,
    function () {
      $newSlot.remove();
      $guestEl.attr("data-moving", "false").show();
      $flyer.remove();
      updateRoomIndices($targetRoom);
    }
  );
}

// Tasks 4-5: Sort guests and handle quick clicks.

function toggleSortRoom($room) {
  // Finish any guest moves before sorting.
  $(".flying-guest, .guest-slot").stop(true, true);
  closeGuestPopup(true);

  const isSorted = $room.attr("data-sorted") === "true";
  const nextSorted = !isSorted;
  $room.attr("data-sorted", nextSorted);

  const $btn = $room.find(".sort-btn");
  if (nextSorted) {
    $btn.addClass("sorted").text("Sorted by time ✓");
  } else {
    $btn.removeClass("sorted").text("Sort by time");
  }

  const $guestsContainer = $room.find(".guests");
  const $cards = $guestsContainer.children(".guest");

  // Stop card animations where they are.
  // Clear the animation queue to prevent repeated moves on quick clicks.
  $cards.stop(true, false);

  // Save each card's current position (both left and top in case cards wrap to multiple rows).
  const oldPosMap = {};
  $cards.each(function () {
    const name = $(this).attr("data-name");
    const pos = $(this).position();
    oldPosMap[name] = { left: pos.left, top: pos.top };
  });

  // Sort by arrival time or restore the original order.
  const sortedNodes = $cards.get();
  sortedNodes.sort(function (a, b) {
    if (nextSorted) {
      const timeA = $(a).attr("data-time");
      const timeB = $(b).attr("data-time");
      return timeA.localeCompare(timeB);
    } else {
      return Number($(a).attr("data-orig-index")) - Number($(b).attr("data-orig-index"));
    }
  });

  // Reset the offset and move cards into the new order.
  $cards.css({ left: "0px", top: "0px" });
  for (let i = 0; i < sortedNodes.length; i++) {
    $guestsContainer.append(sortedNodes[i]);
  }

  // Animate cards from their old positions to the new ones.
  $cards.each(function () {
    const $c = $(this);
    const name = $c.attr("data-name");
    const newPos = $c.position();
    const deltaX = oldPosMap[name].left - newPos.left;
    const deltaY = oldPosMap[name].top - newPos.top;

    $c.css({ left: deltaX + "px", top: deltaY + "px" }).animate({ left: "0px", top: "0px" }, 400);
  });
}

// Tasks 1-20 and spotlight.

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

// Run a task and spotlight the matching guests.
function runCase(caseObj) {
  buildPage();

  const $found = caseObj.run();

  const names = [];
  $found.each(function () {
    names.push($(this).attr("data-name"));
  });

  // Decide which guests stay bright.
  let $brightGuests;
  if ($found.hasClass("room")) {
    // For tasks 14-16, dim guests outside the matching rooms.
    $found.addClass("highlight-room");
    $brightGuests = $found.find(".guest");
  } else {
    $brightGuests = $found;
  }

  const $otherGuests = $(".guest").not($brightGuests);

  // Dim the other guests with fadeTo().
  $otherGuests.stop(true, true).fadeTo(300, 0.2);

  // Highlight and animate matching guests.
  $brightGuests.addClass("highlight");
  if (caseObj.id !== 19) {
    $brightGuests
      .animate({ top: "-14px" }, 160)
      .animate({ top: "0px" }, 160);
  }

  $("#result-question").text("Case " + caseObj.id + ": " + caseObj.question);
  $("#result-names").text("Found (" + names.length + "): " + names.join(", "));
  $("#result-chain").text(caseObj.chainText);
}

// Clear the spotlight.
function clearSpotlight() {
  closeGuestPopup(false);
  $(".case-btn").removeClass("active");
  $(".room").removeClass("highlight-room");

  // Restore guests added or removed by tasks 18 and 19.
  if ($(".guest[data-name='Natasha']").length === 0 || $(".guest[data-name='Miras']").length > 0) {
    buildPage();
    $(".guest").css("opacity", 0.2);
  }

  $(".guest")
    .removeClass("highlight")
    .stop(true, true)
    .css("top", "0px")
    .fadeTo(300, 1);

  $("#result-question").text("Spotlight cleared — all guests are bright again");
  $("#result-names").text("Found: —");
  $("#result-chain").text('$(".guest").stop(true, true).fadeTo(300, 1)');
}

// Set up the page and event handlers.

$(function () {
  $("#leg-phone").html(ICONS.phone);
  $("#leg-glasses").html(ICONS.glasses);
  $("#leg-bag").html(ICONS.bag);
  $("#leg-cup").html(ICONS.cup);
  $("#leg-crumbs").html(ICONS.crumbs);
  $("#leg-clock").html(ICONS.clock);
  $("#leg-aitu").html(ICONS.aitu);

  buildPage();

  // Task buttons.
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

    $btn.on("click", function () {
      $(".case-btn").removeClass("active");
      $(this).addClass("active");
      runCase(c);
    });

    $btnContainer.append($btn);
  }

  // Clear spotlight button.
  $("#clear-btn").on("click", function () {
    clearSpotlight();
  });

  // Open a guest popup when a guest is clicked.
  $("#house").on("click", ".guest", function (event) {
    event.stopPropagation();
    openGuestPopup($(this));
  });

  // Sort guests when the room button is clicked.
  $("#house").on("click", ".sort-btn", function (event) {
    event.stopPropagation();
    const $room = $(this).closest(".room");
    toggleSortRoom($room);
  });

  // Close the popup when clicking outside it.
  $(document).on("click", function (event) {
    if ($activePopup && $(event.target).closest(".guest-popup-card, .guest").length === 0) {
      closeGuestPopup(false);
    }
  });

  // Close the popup with Escape.
  $(document).on("keydown", function (event) {
    if (event.key === "Escape") {
      closeGuestPopup(false);
    }
  });
});
