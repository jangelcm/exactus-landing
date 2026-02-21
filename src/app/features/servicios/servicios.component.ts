import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CardExactusComponent } from '../../shared/components/card-exactus/card-exactus.component';
export interface Servicio {
    title: string;
    description: string;
    image: string;
    subtitle1: string;
    detail1: string;
    detail1Items: string[];
    subtitle2: string;
    detail2: string;
    detail2Items: string[];
}

@Component({
    selector: 'app-servicios',
    imports: [CommonModule, CardExactusComponent],
    templateUrl: './servicios.component.html',
    styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            const serviceIndex = params['service'];
            if (serviceIndex !== undefined && serviceIndex >= 0 && serviceIndex < this.servicios.length) {
                this.selectedServicio = this.servicios[parseInt(serviceIndex, 10)];
            }
        });
    }
    servicios: Servicio[] = [
        {
            title: 'Asesoría Tributaria',
            description: 'Analizar, establecer y diseñar controles para el estricto cumplimiento de las normas tributarias que rigen a las empresas.',
            image: 'assets/servicios/tributaria.jpg',
            subtitle1: 'Cumplimiento Tributario Integral',
            detail1: 'Nos enfocamos en industrias, productos y servicios especializados, aplicando procesos de eficiencia y transparencia total. Nuestro objetivo es brindar el mejor apoyo fiscal y legal como parte de una asesoría integral, ayudando a las empresas desde el cumplimiento tributario hasta alcanzar una situación fiscal óptima.',
            detail1Items: [
                'Devoluciones de impuestos (Retenciones, percepciones, Saldo a favor)',
                'Liberación de fondos de detracciones',
                'Planeamiento Tributario mensual y anual',
                'Análisis y determinación del Impuesto a la Renta e IGV',
                'Afrontamiento de procesos de fiscalización tributaria por SUNAT'
            ],
            subtitle2: 'Estrategia Fiscal y Contingencias',
            detail2: 'Apoyamos a nuestros clientes en el correcto entendimiento de la legislación tributaria aplicable a los distintos sectores de la actividad empresarial para prevenir contingencias y litigar contra las indebidas exigencias fiscales que pudieran originar las incorrectas interpretaciones legales.',
            detail2Items: [
                'Asesoría en acogimiento a beneficios tributarios',
                'Recuperación de IGV exportador',
                'Restitución de derechos arancelarios DRAWBACK',
                'Recursos de reclamación y apelación',
                'Auditorías tributarias preventivas'
            ]
        },
        {
            title: 'Asesoría Laboral',
            description: 'Asesoramiento y gestión laboral a empresas, procedimiento laboral, extranjería. Aplicar con precisión las obligaciones legales vigentes.',
            image: 'assets/servicios/laboral.jpg',
            subtitle1: 'Gestión de Relaciones Laborales',
            detail1: 'Proporcionamos asesoría especializada en materia laboral, asegurando que su empresa cumpla con todas las regulaciones vigentes y mantenga relaciones armoniosas con sus colaboradores. Nos enfocamos en minimizar riesgos laborales y optimizar procesos de recursos humanos.',
            detail1Items: [
                'Elaboración y actualización de políticas laborales',
                'Asesoría en contratación y terminación de contratos',
                'Negociación colectiva y acuerdos sindacales',
                'Resolución de conflictos laborales',
                'Capacitación en normativa laboral vigente'
            ],
            subtitle2: 'Cumplimiento de Obligaciones Formales',
            detail2: 'Garantizamos que su empresa cumpla con todas las obligaciones formales ante las autoridades laborales, incluyendo registro de trabajadores, pagos de beneficios y procedimientos administrativos especializados.',
            detail2Items: [
                'Registro de trabajadores y afiliación a sistemas de pensiones',
                'Gestión de beneficios sociales y gratificaciones',
                'Asesoría en procedimientos de inspección laboral',
                'Gestión de permisos de trabajo para extranjeros',
                'Documentación y formalización de relaciones laborales'
            ]
        },
        {
            title: 'Asesoría Jurídica',
            description: 'Abogados de empresa, servicios legales, derecho mercantil y societario, sucesión patrimonial, corporate compliance.',
            image: 'assets/servicios/juridica.jpg',
            subtitle1: 'Derecho Mercantil y Societario',
            detail1: 'Ofrecemos servicios legales especializados en materia comercial y corporativa, asistiendo a empresas en la estructura legal de sus operaciones, fusiones, adquisiciones y transformaciones societarias para garantizar solidez jurídica.',
            detail1Items: [
                'Constitución y modificación de estatutos sociales',
                'Asesoría en fusiones y adquisiciones (M&A)',
                'Drafting de contratos comerciales complejos',
                'Derecho del consumidor y comercio electrónico',
                'Compliance corporativo e interno'
            ],
            subtitle2: 'Patrimonio y Sucesión',
            detail2: 'Brindamos asesoría integral en materia de planificación patrimonial, sucesión hereditaria y protección de activos para garantizar la transferencia ordenada y eficiente del patrimonio familiar y empresarial.',
            detail2Items: [
                'Planificación patrimonial y sucesoria',
                'Elaboración de testamentos y fideicomisos',
                'Gestión de herencias y sucesiones',
                'Protección de activos contra acreedores',
                'Asesoría en propiedad intelectual y marcas'
            ]
        },
        {
            title: 'Informes Especiales',
            description: 'Diferentes tipos de informes requeridos en distintas situaciones, alineados a las circunstancias inherentes a cada caso.',
            image: 'assets/servicios/juridica.jpg',
            subtitle1: 'Informes Financieros y de Gestión',
            detail1: 'Elaboramos informes especializados que proporcionan análisis detallado de la situación financiera y operativa de su empresa, dirigidos a accionistas, entidades financieras, autoridades regulatorias u otros stakeholders interesados.',
            detail1Items: [
                'Informes de sostenibilidad y responsabilidad social',
                'Análisis de viabilidad económica y financiera',
                'Evaluación de desempeño de proyectos',
                'Informes de gestión y control interno',
                'Due diligence financiero'
            ],
            subtitle2: 'Informes Periciales y Técnicos',
            detail2: 'Preparamos informes técnicos y periciales requeridos en contextos legales, administrativos o comerciales, proporcionando análisis objetivo y fundamentado para casos complejos o controversiales.',
            detail2Items: [
                'Informes periciales contables',
                'Pericias en litigios comerciales',
                'Evaluación de daños y perjuicios',
                'Informes de cumplimiento normativo',
                'Análisis forense contable'
            ]
        },
        {
            title: 'Outsourcing Contable',
            description: 'Delegar áreas y funcionalidades no estratégicas para que la empresa se enfoque en lo esencial.',
            image: 'assets/servicios/outsourcing.jpg',
            subtitle1: 'Contabilidad y Registro Operativo',
            detail1: 'Asumimos la gestión completa de la contabilidad operativa de su empresa, desde el registro de transacciones hasta la preparación de estados financieros, permitiéndole enfocarse en el crecimiento del negocio.',
            detail1Items: [
                'Registro contable diario y procesamiento de documentos',
                'Conciliación bancaria y de cuentas',
                'Elaboración de asientos contables complejos',
                'Mantenimiento actualizado del catálogo de cuentas',
                'Cierre mensual y preparación de reportes'
            ],
            subtitle2: 'Gestión Administrativa y Financiera',
            detail2: 'Administramos funciones administrativas y financieras que no son estratégicas para su negocio, optimizando costos operativos sin comprometer la calidad ni el control interno.',
            detail2Items: [
                'Administración de cuentas por cobrar y por pagar',
                'Gestión de nómina y contribuciones',
                'Control de inventarios y activos fijos',
                'Facturación electrónica y comprobantes',
                'Reportes y análisis financieros mensuales'
            ]
        },
        {
            title: 'Auditoría Tributaria',
            description: 'Fiscalizar el correcto cumplimiento de la obligación tributaria principal y las accesorias/formales.',
            image: 'assets/servicios/auditoria-tributaria.jpg',
            subtitle1: 'Evaluación de Cumplimiento Tributario',
            detail1: 'Realizamos auditorías integrales de los aspectos tributarios de su empresa, evaluando el cumplimiento de obligaciones formales y sustantivas, identificando riesgos y contingencias potenciales antes de una fiscalización de la autoridad.',
            detail1Items: [
                'Revisión de declaraciones juradas y anexos tributarios',
                'Análisis de cumplimiento de retenciones y percepciones',
                'Evaluación del registro de compras y ventas',
                'Verificación de sustento documentario',
                'Análisis de operaciones sospechosas'
            ],
            subtitle2: 'Identificación de Oportunidades y Riesgos',
            detail2: 'Identificamos deficiencias, riesgos fiscales y oportunidades de optimización tributaria, proporcionando recomendaciones preventivas para evitar sanciones administrativas y litigios con la administración tributaria.',
            detail2Items: [
                'Diagnóstico de vulnerabilidades tributarias',
                'Análisis de riesgo fiscal integral',
                'Recomendaciones para reducción de pasivos tributarios',
                'Documentación para sustentación ante SUNAT',
                'Preparación para fiscalización futura'
            ]
        },
        {
            title: 'Auditoría Financiera',
            description: 'Examina los estados financieros y operaciones para emitir una opinión técnica y profesional.',
            image: 'assets/servicios/auditoria-financiera.png',
            subtitle1: 'Auditoría de Estados Financieros',
            detail1: 'Realizamos auditorías independientes de los estados financieros de su empresa siguiendo normas internacionales de auditoría, proporcionando una opinión técnica sobre la razonabilidad de la información financiera presentada.',
            detail1Items: [
                'Auditoría integral de balance general y estado de resultados',
                'Evaluación de estimaciones contables y provisiones',
                'Revisión de reconocimiento de ingresos',
                'Análisis de activos intangibles y depreciación',
                'Opinión técnica de razonabilidad'
            ],
            subtitle2: 'Control Interno y Eficiencia Operativa',
            detail2: 'Evaluamos el sistema de control interno de su empresa, identificando debilidades en procesos, segregación de funciones y controles compensatorios para mejorar la eficiencia operativa y prevenir fraudes.',
            detail2Items: [
                'Evaluación del ambiente de control',
                'Testing de controles clave',
                'Análisis de segregación de funciones',
                'Evaluación de tecnología y sistemas',
                'Recomendaciones de mejora operativa'
            ]
        }
    ];

    selectedServicio: Servicio = this.servicios[0];

    selectServicio(servicio: Servicio) {
        this.selectedServicio = servicio;
        window.scrollTo(0, 0);
    }
}
