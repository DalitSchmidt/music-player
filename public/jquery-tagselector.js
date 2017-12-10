// $(function() {
//     var tags = [
//         { id: 42, toString: function() { return 'jQuery'; } },
//         { id: 31, toString: function() { return 'Python'; } },
//         { id: 25, toString: function() { return 'HTML'; } },
//         { id: 83, toString: function() { return 'PHP'; } },
//         { id: 40, toString: function() { return 'ASP.NET MVC'; } },
//         { id: 25, toString: function() { return 'CSS'; } },
//         { id: 66, toString: function() { return 'JavaScript'; } },
//         { id: 87, toString: function() { return 'C#'; } },
//         { id: 28, toString: function() { return 'D'; } },
//         { id: 91, toString: function() { return 'Java'; } },
//         { id: 10, toString: function() { return 'Ruby'; } },
//     ]
//
//     $('#tags').tagSelector(tags, 'tags')


// (function($) {
    $.fn.tagSelector = function(source, name) {
        return this.each(function() {
            var selector = $(this),
                input = $('input[type=text]', this);
            selector.click(function() { input.focus(); })
                .delegate('.tag a', 'click', function() {
                    $(this).parent().remove();
                });
            input.keydown(function(e) {
                if (e.keyCode === $.ui.keyCode.TAB && $(this).data('autocomplete').menu.active)
                    e.preventDefault();
            })
                .autocomplete({
                    minLength: 0,
                    source: source,
                    select: function(event, ui) {
                        //<span class=tag>@jcarrascal <a>×</a><input type=hidden name=tag value=1/></span>
                        var tag = $('<span class="tag"/>')
                            .text(ui.item.toString() + ' ')
                            .attr('data-genre-id', ui.item.id)
                            .append('<a>×</a>')
                            .append($('<input type="hidden"/>').attr('name', name).val(ui.item.id))
                            .insertBefore(input);
                        return true;
                    }
                });
            input.data('autocomplete')._renderItem = function(ul, item) {
                return $('<li/>')
                    .data('item.autocomplete', item)
                    .append($('<a/>').text(item.toString()))
                    .appendTo(ul);
            };
            input.data('autocomplete')._resizeMenu = function(ul, item) {
                var ul = this.menu.element;
                ul.outerWidth(Math.max(
                    ul.width('').outerWidth(),
                    selector.outerWidth()
                ));
            };
        });
    };
// })

// })(jQuery);