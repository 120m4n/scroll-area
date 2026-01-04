# 🎨 Scroll Area Web Component

Un componente web creado con vanilla JavaScript que gestiona el scroll horizontal o vertical de manera automática o manual.

## ✨ Características

- 🚀 **Vanilla JavaScript**: Sin dependencias, solo Web Components estándar
- 🔄 **Detección Automática**: Detecta automáticamente la orientación según las dimensiones
- 🎮 **Control Manual**: Permite establecer la orientación manualmente mediante atributos
- 📱 **Responsive**: Se adapta a cambios de tamaño en tiempo real
- 🎨 **Personalizable**: Fácil de estilizar con CSS
- ⚡ **Ligero**: Código mínimo y eficiente

## 🚀 Inicio Rápido

### Instalación

Simplemente incluye el archivo JavaScript en tu HTML:

```html
<script src="scroll-area.js"></script>
```

### Uso Básico

```html
<!-- Scroll horizontal (auto-detectado) -->
<scroll-area style="width: 500px; height: 200px;">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</scroll-area>

<!-- Scroll vertical (auto-detectado) -->
<scroll-area style="width: 300px; height: 400px;">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</scroll-area>

<!-- Control manual -->
<scroll-area orientation="horizontal">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</scroll-area>
```

## 📖 API

### Atributos

- `orientation`: Establece manualmente la orientación (`"horizontal"` o `"vertical"`)
  - Si no se especifica, se detecta automáticamente basándose en las dimensiones

### Propiedades

```javascript
const scrollArea = document.querySelector('scroll-area');

// Obtener orientación actual
console.log(scrollArea.orientation); // "horizontal" o "vertical"

// Establecer orientación manualmente
scrollArea.orientation = 'horizontal';
scrollArea.orientation = 'vertical';
```

### Métodos

```javascript
const scrollArea = document.querySelector('scroll-area');

// Hacer scroll al inicio
scrollArea.scrollToStart();

// Hacer scroll al final
scrollArea.scrollToEnd();
```

### Eventos

```javascript
const scrollArea = document.querySelector('scroll-area');

// Escuchar cambios de orientación
scrollArea.addEventListener('orientationchange', (event) => {
  console.log('Nueva orientación:', event.detail.orientation);
});
```

## 🎯 Detección Automática de Orientación

El componente detecta automáticamente la orientación basándose en las dimensiones:

- **Vertical**: Si `height > width`
- **Horizontal**: Si `width > height`

Esta detección se actualiza automáticamente cuando el tamaño del contenedor cambia.

## 💡 Ejemplos

Consulta el archivo `examples.html` para ver ejemplos completos que incluyen:

1. **Ejemplo 1**: Scroll horizontal con auto-detección
2. **Ejemplo 2**: Scroll vertical con auto-detección
3. **Ejemplo 3**: Control manual de orientación

Cada ejemplo incluye:
- 3 botones de control
- 3 contenedores div
- Funcionalidad para agregar items dinámicamente
- Indicadores de estado

## 🎨 Personalización

El componente usa Shadow DOM, pero puedes estilizar el elemento host:

```css
scroll-area {
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: #f9f9f9;
}

scroll-area[data-scroll-orientation="horizontal"] {
  /* Estilos específicos para horizontal */
}

scroll-area[data-scroll-orientation="vertical"] {
  /* Estilos específicos para vertical */
}
```

## 🌐 Compatibilidad

Este componente sigue los estándares de Web Components:
- [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)
- [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)
- [HTML Templates](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots)

Compatible con todos los navegadores modernos que soportan Web Components.

## 📄 Licencia

MIT

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias o mejoras.
