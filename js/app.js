// Datos Mock
const mockData = {
    productos: [
        { id: 1, codigo: 'PROD001', nombre: 'Laptop HP Pavilion', precio: 899.99, stock: 15, categoria: 'Electrónica', imagen: '💻' },
        { id: 2, codigo: 'PROD002', nombre: 'Mouse Inalámbrico', precio: 25.99, stock: 50, categoria: 'Accesorios', imagen: '🖱️' },
        { id: 3, codigo: 'PROD003', nombre: 'Teclado Mecánico', precio: 89.99, stock: 5, categoria: 'Accesorios', imagen: '⌨️' },
        { id: 4, codigo: 'PROD004', nombre: 'Monitor 24"', precio: 299.99, stock: 8, categoria: 'Electrónica', imagen: '🖥️' },
        { id: 5, codigo: 'PROD005', nombre: 'Audífonos Bluetooth', precio: 79.99, stock: 3, categoria: 'Audio', imagen: '🎧' },
        { id: 6, codigo: 'PROD006', nombre: 'Tablet Samsung', precio: 399.99, stock: 12, categoria: 'Electrónica', imagen: '📱' },
        { id: 7, codigo: 'PROD007', nombre: 'Cargador Portátil', precio: 35.99, stock: 25, categoria: 'Accesorios', imagen: '🔋' },
        { id: 8, codigo: 'PROD008', nombre: 'Webcam HD', precio: 59.99, stock: 7, categoria: 'Accesorios', imagen: '📹' },
        { id: 9, codigo: 'PROD009', nombre: 'Disco Duro 1TB', precio: 69.99, stock: 4, categoria: 'Almacenamiento', imagen: '💾' },
        { id: 10, codigo: 'PROD010', nombre: 'Impresora Multifuncional', precio: 199.99, stock: 6, categoria: 'Oficina', imagen: '🖨️' },
        { id: 11, codigo: 'PROD011', nombre: 'Router WiFi', precio: 89.99, stock: 9, categoria: 'Redes', imagen: '📡' },
        { id: 12, codigo: 'PROD012', nombre: 'Smartwatch', precio: 249.99, stock: 2, categoria: 'Wearables', imagen: '⌚' },
        { id: 13, codigo: 'PROD013', nombre: 'Parlante Bluetooth', precio: 129.99, stock: 11, categoria: 'Audio', imagen: '🔊' },
        { id: 14, codigo: 'PROD014', nombre: 'Memoria USB 64GB', precio: 19.99, stock: 30, categoria: 'Almacenamiento', imagen: '💽' },
        { id: 15, codigo: 'PROD015', nombre: 'Cámara IP', precio: 79.99, stock: 8, categoria: 'Seguridad', imagen: '📷' },
        { id: 16, codigo: 'PROD016', nombre: 'Proyector', precio: 499.99, stock: 3, categoria: 'Electrónica', imagen: '📽️' },
        { id: 17, codigo: 'PROD017', nombre: 'Silla Gamer', precio: 299.99, stock: 5, categoria: 'Muebles', imagen: '🪑' },
        { id: 18, codigo: 'PROD018', nombre: 'Micrófono USB', precio: 89.99, stock: 7, categoria: 'Audio', imagen: '🎙️' },
        { id: 19, codigo: 'PROD019', nombre: 'Adaptador HDMI', precio: 15.99, stock: 40, categoria: 'Accesorios', imagen: '🔌' },
        { id: 20, codigo: 'PROD020', nombre: 'Lámpara LED', precio: 45.99, stock: 12, categoria: 'Iluminación', imagen: '💡' }
    ],
    
    ventas: [
        { id: 1001, fecha: '2026-02-10', cliente: 'Juan Pérez', total: 125.98, productos: 3, estado: 'Completada' },
        { id: 1002, fecha: '2026-02-11', cliente: 'María García', total: 899.99, productos: 1, estado: 'Completada' },
        { id: 1003, fecha: '2026-02-11', cliente: 'Carlos López', total: 245.97, productos: 4, estado: 'Completada' },
        { id: 1004, fecha: '2026-02-12', cliente: 'Ana Martínez', total: 159.98, productos: 2, estado: 'Pendiente' },
        { id: 1005, fecha: '2026-02-12', cliente: 'Roberto Sánchez', total: 679.95, productos: 5, estado: 'Completada' },
        { id: 1006, fecha: '2026-02-13', cliente: 'Laura Torres', total: 89.99, productos: 1, estado: 'Cancelada' },
        { id: 1007, fecha: '2026-02-13', cliente: 'Diego Ramírez', total: 329.98, productos: 3, estado: 'Completada' },
        { id: 1008, fecha: '2026-02-14', cliente: 'Sofia Herrera', total: 45.99, productos: 2, estado: 'Completada' },
        { id: 1009, fecha: '2026-02-14', cliente: 'Jorge Díaz', total: 519.97, productos: 4, estado: 'Pendiente' },
        { id: 1010, fecha: '2026-02-15', cliente: 'Patricia Ruiz', total: 199.99, productos: 1, estado: 'Completada' }
    ]
};

// Variables globales
let carrito = [];
let productosFiltrados = [...mockData.productos];

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = 'success') {
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    alerta.style.zIndex = '9999';
    alerta.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alerta);
    
    setTimeout(() => {
        alerta.remove();
    }, 3000);
}

// Funciones del Carrito
function agregarAlCarrito(productoId) {
    const producto = mockData.productos.find(p => p.id === productoId);
    if (!producto) return;
    
    const itemExistente = carrito.find(item => item.id === productoId);
    
    if (itemExistente) {
        if (itemExistente.cantidad < producto.stock) {
            itemExistente.cantidad++;
            mostrarNotificacion(`Cantidad actualizada: ${producto.nombre}`, 'info');
        } else {
            mostrarNotificacion('Stock insuficiente', 'warning');
            return;
        }
    } else {
        if (producto.stock > 0) {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: 1,
                imagen: producto.imagen
            });
            mostrarNotificacion(`${producto.nombre} agregado al carrito`, 'success');
        } else {
            mostrarNotificacion('Producto sin stock', 'danger');
            return;
        }
    }
    
    actualizarCarrito();
    actualizarContadorCarrito();
}

function eliminarDelCarrito(productoId) {
    const index = carrito.findIndex(item => item.id === productoId);
    if (index !== -1) {
        const producto = carrito[index];
        carrito.splice(index, 1);
        mostrarNotificacion(`${producto.nombre} eliminado del carrito`, 'warning');
        actualizarCarrito();
        actualizarContadorCarrito();
    }
}

function actualizarCantidad(productoId, nuevaCantidad) {
    const item = carrito.find(item => item.id === productoId);
    const producto = mockData.productos.find(p => p.id === productoId);
    
    if (item && producto) {
        if (nuevaCantidad > 0 && nuevaCantidad <= producto.stock) {
            item.cantidad = nuevaCantidad;
            actualizarCarrito();
            actualizarContadorCarrito();
        } else if (nuevaCantidad > producto.stock) {
            mostrarNotificacion('Stock insuficiente', 'warning');
        } else if (nuevaCantidad === 0) {
            eliminarDelCarrito(productoId);
        }
    }
}

function calcularTotales() {
    const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const iva = subtotal * 0.16;
    const total = subtotal + iva;
    
    return { subtotal, iva, total };
}

function actualizarCarrito() {
    const cartItems = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartIva = document.getElementById('cart-iva');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItems) return;
    
    if (carrito.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center py-4 text-muted">
                <i class="bi bi-cart" style="font-size: 3rem;"></i>
                <p class="mt-2">El carrito está vacío</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = carrito.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <h6>${item.nombre}</h6>
                    <small>$${item.precio.toFixed(2)} c/u</small>
                </div>
                <div class="cart-item-actions">
                    <button class="btn btn-sm btn-outline-secondary" onclick="actualizarCantidad(${item.id}, ${item.cantidad - 1})">
                        <i class="bi bi-dash"></i>
                    </button>
                    <span class="fw-bold">${item.cantidad}</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="actualizarCantidad(${item.id}, ${item.cantidad + 1})">
                        <i class="bi bi-plus"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${item.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    const totales = calcularTotales();
    if (cartSubtotal) cartSubtotal.textContent = `$${totales.subtotal.toFixed(2)}`;
    if (cartIva) cartIva.textContent = `$${totales.iva.toFixed(2)}`;
    if (cartTotal) cartTotal.textContent = `$${totales.total.toFixed(2)}`;
}

function actualizarContadorCarrito() {
    const contador = document.getElementById('cart-count');
    if (contador) {
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        contador.textContent = totalItems;
        contador.style.display = totalItems > 0 ? 'inline' : 'none';
    }
}

function finalizarVenta() {
    if (carrito.length === 0) {
        mostrarNotificacion('El carrito está vacío', 'warning');
        return;
    }
    
    const totales = calcularTotales();
    const modalBody = document.getElementById('ventaModalBody');
    if (modalBody) {
        modalBody.innerHTML = `
            <p><strong>Resumen de la venta:</strong></p>
            <ul class="list-group mb-3">
                ${carrito.map(item => `
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        ${item.nombre} x${item.cantidad}
                        <span class="badge bg-primary rounded-pill">$${(item.precio * item.cantidad).toFixed(2)}</span>
                    </li>
                `).join('')}
            </ul>
            <div class="text-end">
                <p><strong>Subtotal:</strong> $${totales.subtotal.toFixed(2)}</p>
                <p><strong>IVA (16%):</strong> $${totales.iva.toFixed(2)}</p>
                <h5 class="text-success"><strong>Total:</strong> $${totales.total.toFixed(2)}</h5>
            </div>
        `;
    }
    
    const modal = new bootstrap.Modal(document.getElementById('ventaModal'));
    modal.show();
}

function confirmarVenta() {
    const totales = calcularTotales();
    const nuevaVenta = {
        id: mockData.ventas.length + 1001,
        fecha: new Date().toISOString().split('T')[0],
        cliente: 'Cliente Mostrador',
        total: totales.total,
        productos: carrito.reduce((sum, item) => sum + item.cantidad, 0),
        estado: 'Completada'
    };
    
    mockData.ventas.unshift(nuevaVenta);
    carrito = [];
    actualizarCarrito();
    actualizarContadorCarrito();
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('ventaModal'));
    modal.hide();
    
    mostrarNotificacion('Venta completada exitosamente', 'success');
    
    // Actualizar stock
    carrito.forEach(item => {
        const producto = mockData.productos.find(p => p.id === item.id);
        if (producto) {
            producto.stock -= item.cantidad;
        }
    });
}

// Funciones de búsqueda
function buscarProductos(termino) {
    if (!termino) {
        productosFiltrados = [...mockData.productos];
    } else {
        const terminoLower = termino.toLowerCase();
        productosFiltrados = mockData.productos.filter(producto => 
            producto.nombre.toLowerCase().includes(terminoLower) ||
            producto.codigo.toLowerCase().includes(terminoLower) ||
            producto.categoria.toLowerCase().includes(terminoLower)
        );
    }
    
    renderizarProductos();
}

function renderizarProductos() {
    const productosGrid = document.getElementById('productos-grid');
    if (!productosGrid) return;
    
    productosGrid.innerHTML = productosFiltrados.map(producto => `
        <div class="col">
            <div class="card product-card h-100">
                <div class="card-img-top d-flex align-items-center justify-content-center bg-light">
                    <span style="font-size: 3rem;">${producto.imagen}</span>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text text-success fw-bold">$${producto.precio.toFixed(2)}</p>
                    <p class="card-text">
                        <small class="text-muted">Stock: 
                            <span class="${producto.stock <= 5 ? 'text-danger fw-bold' : ''}">
                                ${producto.stock}
                            </span>
                        </small>
                    </p>
                    <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})" 
                            ${producto.stock === 0 ? 'disabled' : ''}>
                        <i class="bi bi-cart-plus"></i> Agregar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Funciones para tabla de productos
function renderizarTablaProductos() {
    const tablaBody = document.getElementById('productos-table-body');
    if (!tablaBody) return;
    
    tablaBody.innerHTML = mockData.productos.map(producto => `
        <tr>
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>
                <span class="stock-badge ${producto.stock <= 5 ? 'stock-low' : 'stock-normal'}">
                    ${producto.stock} unidades
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="editarProducto(${producto.id})">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto(${producto.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function editarProducto(id) {
    const producto = mockData.productos.find(p => p.id === id);
    if (producto) {
        mostrarNotificacion(`Editando producto: ${producto.nombre}`, 'info');
    }
}

function eliminarProducto(id) {
    const producto = mockData.productos.find(p => p.id === id);
    if (producto) {
        if (confirm(`¿Estás seguro de eliminar ${producto.nombre}?`)) {
            mostrarNotificacion(`Producto ${producto.nombre} eliminado (demo)`, 'warning');
        }
    }
}

// Funciones para ventas
function renderizarTablaVentas() {
    const tablaBody = document.getElementById('ventas-table-body');
    if (!tablaBody) return;
    
    tablaBody.innerHTML = mockData.ventas.map(venta => `
        <tr style="cursor: pointer;" onclick="verDetalleVenta(${venta.id})">
            <td>${venta.id}</td>
            <td>${venta.fecha}</td>
            <td>${venta.cliente}</td>
            <td>$${venta.total.toFixed(2)}</td>
            <td>
                <span class="badge ${venta.estado === 'Completada' ? 'bg-success' : venta.estado === 'Pendiente' ? 'bg-warning' : 'bg-danger'}">
                    ${venta.estado}
                </span>
            </td>
            <td>${venta.productos}</td>
        </tr>
    `).join('');
}

function verDetalleVenta(id) {
    const venta = mockData.ventas.find(v => v.id === id);
    if (!venta) return;
    
    const modalBody = document.getElementById('detalleVentaModalBody');
    if (modalBody) {
        modalBody.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <p><strong>ID Venta:</strong> ${venta.id}</p>
                    <p><strong>Fecha:</strong> ${venta.fecha}</p>
                    <p><strong>Cliente:</strong> ${venta.cliente}</p>
                </div>
                <div class="col-md-6">
                    <p><strong>Total:</strong> $${venta.total.toFixed(2)}</p>
                    <p><strong>Estado:</strong> 
                        <span class="badge ${venta.estado === 'Completada' ? 'bg-success' : venta.estado === 'Pendiente' ? 'bg-warning' : 'bg-danger'}">
                            ${venta.estado}
                        </span>
                    </p>
                    <p><strong>Productos:</strong> ${venta.productos}</p>
                </div>
            </div>
            <hr>
            <h6>Productos de la venta:</h6>
            <ul class="list-group">
                <li class="list-group-item">Producto de ejemplo 1 x2 - $125.98</li>
                <li class="list-group-item">Producto de ejemplo 2 x1 - $45.99</li>
            </ul>
        `;
    }
    
    const modal = new bootstrap.Modal(document.getElementById('detalleVentaModal'));
    modal.show();
}

function filtrarVentas() {
    const fechaInicio = document.getElementById('fecha-inicio')?.value;
    const fechaFin = document.getElementById('fecha-fin')?.value;
    
    if (!fechaInicio || !fechaFin) {
        renderizarTablaVentas();
        return;
    }
    
    const ventasFiltradas = mockData.ventas.filter(venta => 
        venta.fecha >= fechaInicio && venta.fecha <= fechaFin
    );
    
    const tablaBody = document.getElementById('ventas-table-body');
    if (tablaBody) {
        if (ventasFiltradas.length === 0) {
            tablaBody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center py-4">
                        <i class="bi bi-inbox" style="font-size: 2rem;"></i>
                        <p class="mt-2">No hay ventas en este período</p>
                    </td>
                </tr>
            `;
        } else {
            tablaBody.innerHTML = ventasFiltradas.map(venta => `
                <tr style="cursor: pointer;" onclick="verDetalleVenta(${venta.id})">
                    <td>${venta.id}</td>
                    <td>${venta.fecha}</td>
                    <td>${venta.cliente}</td>
                    <td>$${venta.total.toFixed(2)}</td>
                    <td>
                        <span class="badge ${venta.estado === 'Completada' ? 'bg-success' : venta.estado === 'Pendiente' ? 'bg-warning' : 'bg-danger'}">
                            ${venta.estado}
                        </span>
                    </td>
                    <td>${venta.productos}</td>
                </tr>
            `).join('');
        }
    }
}

// Funciones para reportes
function iniciarGrafico() {
    const ctx = document.getElementById('ventasChart')?.getContext('2d');
    if (!ctx) return;
    
    // Datos de ejemplo para el gráfico
    const dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const ventas = [1200, 1900, 1500, 2100, 2800, 3200, 2500];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dias,
            datasets: [{
                label: 'Ventas diarias ($)',
                data: ventas,
                borderColor: '#0d6efd',
                backgroundColor: 'rgba(13, 110, 253, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#198754',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#0d6efd',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    padding: 12,
                    cornerRadius: 8
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Función para guardar nuevo producto
function guardarNuevoProducto() {
    const form = document.getElementById('nuevoProductoForm');
    if (!form) return;
    
    const nuevoProducto = {
        id: mockData.productos.length + 1,
        codigo: document.getElementById('codigo')?.value || `PROD${String(mockData.productos.length + 1).padStart(3, '0')}`,
        nombre: document.getElementById('nombre')?.value || 'Producto Nuevo',
        precio: parseFloat(document.getElementById('precio')?.value) || 99.99,
        stock: parseInt(document.getElementById('stock')?.value) || 10,
        categoria: document.getElementById('categoria')?.value || 'General',
        imagen: '📦'
    };
    
    mockData.productos.push(nuevoProducto);
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('nuevoProductoModal'));
    modal.hide();
    
    form.reset();
    
    mostrarNotificacion('Producto agregado exitosamente', 'success');
    
    if (document.getElementById('productos-table-body')) {
        renderizarTablaProductos();
    }
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar productos si estamos en POS
    renderizarProductos();
    
    // Renderizar tabla de productos si estamos en productos.html
    renderizarTablaProductos();
    
    // Renderizar tabla de ventas si estamos en ventas.html
    renderizarTablaVentas();
    
    // Iniciar gráfico si estamos en reportes.html
    iniciarGrafico();
    
    // Event listeners para búsqueda
    const searchInput = document.getElementById('search-producto');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            buscarProductos(e.target.value);
        });
    }
    
    // Event listener para filtros de fecha
    const fechaInicio = document.getElementById('fecha-inicio');
    const fechaFin = document.getElementById('fecha-fin');
    
    if (fechaInicio && fechaFin) {
        fechaInicio.addEventListener('change', filtrarVentas);
        fechaFin.addEventListener('change', filtrarVentas);
    }
    
    // Event listener para formulario de nuevo producto
    const btnGuardarProducto = document.getElementById('guardarProducto');
    if (btnGuardarProducto) {
        btnGuardarProducto.addEventListener('click', guardarNuevoProducto);
    }
    
    // Event listener para botón finalizar venta
    const btnFinalizarVenta = document.getElementById('finalizar-venta');
    if (btnFinalizarVenta) {
        btnFinalizarVenta.addEventListener('click', finalizarVenta);
    }
    
    // Event listener para confirmar venta
    const btnConfirmarVenta = document.getElementById('confirmarVenta');
    if (btnConfirmarVenta) {
        btnConfirmarVenta.addEventListener('click', confirmarVenta);
    }
});

// Hacer funciones globales para que puedan ser llamadas desde HTML
window.agregarAlCarrito = agregarAlCarrito;
window.eliminarDelCarrito = eliminarDelCarrito;
window.actualizarCantidad = actualizarCantidad;
window.finalizarVenta = finalizarVenta;
window.confirmarVenta = confirmarVenta;
window.editarProducto = editarProducto;
window.eliminarProducto = eliminarProducto;
window.verDetalleVenta = verDetalleVenta;
window.filtrarVentas = filtrarVentas;