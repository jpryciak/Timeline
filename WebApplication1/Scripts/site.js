﻿(function () {
    var cssSide, entry, entryCount, entrys, gap, i, idx, j, k, l, len, len1, len2, m, maxEntryHeight, minEntryHeight, n, ref, ref1, ref2, scroll, side, sign, subIdx, target, timelineEntrys, toggle, totalHeight;
    entryCount = 100;
    minEntryHeight = 100;
    maxEntryHeight = 500;
    gap = 20;
    timelineEntrys = [];
    for (i = j = 1, ref = entryCount; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
        if (window.CP.shouldStopExecution(1)) {
            break;
        }
        timelineEntrys.push(~~(minEntryHeight + Math.random() * (maxEntryHeight - minEntryHeight)));
    }
    window.CP.exitedLoop(1);
    entrys = [
        [],
        []
    ];
    toggle = 0;
    for (k = 0, len = timelineEntrys.length; k < len; k++) {
        if (window.CP.shouldStopExecution(2)) {
            break;
        }
        entry = timelineEntrys[k];
        target = entrys[toggle > 0 ? 1 : 0];
        sign = toggle > 0 ? 1 : -1;
        if (Math.abs(toggle) < 1) {
            toggle = 0;
        }
        target.push({
            height: entry,
            top: (((ref1 = _.last(target)) != null ? ref1.top : void 0) || 0) + (((ref2 = _.last(target)) != null ? ref2.height : void 0) || 0) + gap
        });
        if (Math.abs(toggle) < gap && entrys[0].length > 0 && entrys[1].length > 0) {
            entrys[0][entrys[0].length - 1].height += gap * 2;
            entrys[1][entrys[1].length - 1].height += gap * 2;
        }
        toggle -= (entry + gap) * sign;
    }
    window.CP.exitedLoop(2);
    for (idx = l = 0, len1 = entrys.length; l < len1; idx = ++l) {
        if (window.CP.shouldStopExecution(5)) {
            break;
        }
        side = entrys[idx];
        cssSide = idx === 0 ? 'left' : 'right';
        for (subIdx = m = 0, len2 = side.length; m < len2; subIdx = ++m) {
            if (window.CP.shouldStopExecution(4)) {
                break;
            }
            entry = side[subIdx];
            for (i = n = 0; n < 6; i = ++n) {
                if (window.CP.shouldStopExecution(3)) {
                    break;
                }
                $('.' + cssSide).append('<div>\n\n<div class="entry hidden" style="\n    height: ' + (entry.height - 30) + 'px;\n    top:    ' + entry.top + 'px;\n  ">\n    <header></header>\n    <article>\n    </article>\n  </div>\n</div>');
                if (idx > 0 || subIdx > 0) {
                    $('.line').append('<div class="dot hidden" style="\n  top: ' + entry.top + 'px;\n"></div>');
                }
            }
            window.CP.exitedLoop(3);
        }
        window.CP.exitedLoop(4);
    }
    window.CP.exitedLoop(5);
    totalHeight = Math.max(_.last(entrys[0]).top + _.last(entrys[0]).height, _.last(entrys[1]).top + _.last(entrys[1]).height);
    $('.line').css({ 'height': totalHeight + 'px' });
    scroll = function () {
        var $this, docBottom, docTop, elem, hit, hits, len3, len4, o, p, ref3, results;
        docTop = $(document).scrollTop();
        docBottom = docTop + window.innerHeight;
        hits = [];
        ref3 = $('.entry, .dot');
        for (o = 0, len3 = ref3.length; o < len3; o++) {
            elem = ref3[o];
            $this = $(elem);
            if ($this.offset().top <= docBottom) {
                $this.removeClass('hidden');
            }
            if ($this.offset().top + $this.height() <= docTop && !$this.hasClass('hidden')) {
                $this.addClass('hidden');
            }
            if ($this.offset().top > docBottom + gap && !$this.hasClass('hidden')) {
                $this.addClass('hidden');
            }
            if ($this.hasClass('dot') && $this.offset().top > docTop && $this.offset().top < docTop + 40) {
                hits.push($this);
            }
        }
        if (hits.length > 0 && !$('.year').hasClass('hit')) {
            $('.year').addClass('hit');
        } else if (hits.length === 0 && $('.year').hasClass('hit')) {
            $('.year').removeClass('hit');
        }
        results = [];
        for (p = 0, len4 = hits.length; p < len4; p++) {
            hit = hits[p];
            if (!hit.hasClass('hidden')) {
                results.push(hit.addClass('hidden'));
            } else {
                results.push(void 0);
            }
        }
        return results;
    };
    $(document).scroll(function () {
        return scroll();
    });
    scroll();
}.call(this));