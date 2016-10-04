const drag = {

  allowDrop: function(ev) {
      ev.preventDefault();
  },

  drag: function(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
  },

  drop: function(ev) {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      console.log(data);
      //ev.target.appendChild(document.getElementById(data));
  },

  onDrag: function(e) {
    var d = e.data;
    if (d.left < 0){d.left = 0}
    if (d.top < 0){d.top = 0}
    if (d.left + $(d.target).outerWidth() > $(d.parent).width()){
      d.left = $(d.parent).width() - $(d.target).outerWidth();
    }
    if (d.top + $(d.target).outerHeight() > $(d.parent).height()){
      d.top = $(d.parent).height() - $(d.target).outerHeight();
    }
  }
};
