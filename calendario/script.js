document.addEventListener('DOMContentLoaded', function() {
  const daysContainer = document.querySelector('.days-container');
  const eventsContainer = document.getElementById('eventsContainer');

  const daysInMonth = 31; // Número de días en mayo (puedes calcularlo dinámicamente según el mes)

  // Generar dinámicamente los días del mes
  for (let i = 1; i <= daysInMonth; i++) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day');
    dayElement.textContent = i;
    daysContainer.appendChild(dayElement);
  }

  // Agregar eventos a los días
  const days = document.querySelectorAll('.day');
  days.forEach(day => {
    day.addEventListener('click', function(event) {
      const selectedDay = event.target;
      showHoursSubMenu(selectedDay);
    });
  });

  function showHoursSubMenu(selectedDay) {
    // Ocultar los submenús de otros días
    const submenus = document.querySelectorAll('.hours-submenu');
    submenus.forEach(submenu => {
      submenu.classList.remove('active');
    });

    // Crear y mostrar el submenú del día seleccionado
    const submenu = document.createElement('div');
    submenu.classList.add('hours-submenu', 'active');

    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(i < 10 ? `0${i}:00` : `${i}:00`);
    }

    hours.forEach(hour => {
      const hourElement = document.createElement('div');
      hourElement.classList.add('hour');
      hourElement.textContent = hour;
      hourElement.addEventListener('click', function() {
        const eventName = prompt('Ingrese el nombre del evento');
        if (eventName) {
          const eventTime = `${selectedDay.textContent} de mayo, ${hour}`;
          const eventElement = createEventElement(eventTime, eventName);
          eventsContainer.appendChild(eventElement);
          selectedDay.classList.add('event-day');
        }
        submenu.classList.remove('active');
      });
      submenu.appendChild(hourElement);
    });

    // Posicionar el submenú debajo del día seleccionado
    const dayRect = selectedDay.getBoundingClientRect();
    submenu.style.top = `${dayRect.bottom}px`;
    submenu.style.left = `${dayRect.left}px`;

    // Adjuntar el submenú al cuerpo del documento
    document.body.appendChild(submenu);
  }

  function createEventElement(eventTime, eventName) {
    const eventElement = document.createElement('div');
    eventElement.classList.add('event');
    eventElement.innerHTML = `
      <span class="event-time">${eventTime}</span>: ${eventName}
      <span class="event-remove" onclick="removeEvent(this)">Eliminar</span>
    `;
    return eventElement;
  }
});

function removeEvent(eventElement) {
  eventElement.parentElement.remove();
}
