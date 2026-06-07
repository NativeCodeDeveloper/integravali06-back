const TIMEZONE_CL = 'America/Santiago';

export function formatearFechaCalendario(valor, opciones = {}) {
    const coincidencia = String(valor ?? '').match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!coincidencia) return String(valor ?? '');

    const [, anio, mes, dia] = coincidencia;
    const fecha = new Date(Date.UTC(Number(anio), Number(mes) - 1, Number(dia)));

    return fecha.toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
        ...opciones
    });
}

export function formatearInstanteChile(valor) {
    return new Intl.DateTimeFormat('es-CL', {
        dateStyle: 'short',
        timeStyle: 'medium',
        timeZone: TIMEZONE_CL
    }).format(new Date(valor));
}

export function obtenerOffsetChile(valor = Date.now()) {
    const parteZona = new Intl.DateTimeFormat('en-US', {
        timeZone: TIMEZONE_CL,
        timeZoneName: 'longOffset'
    }).formatToParts(new Date(valor)).find(({type}) => type === 'timeZoneName');

    const coincidencia = parteZona?.value.match(/^GMT([+-]\d{2}:\d{2})$/);
    if (!coincidencia) {
        throw new Error('No fue posible determinar el offset horario de America/Santiago');
    }

    return coincidencia[1];
}
