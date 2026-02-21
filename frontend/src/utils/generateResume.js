import jsPDF from 'jspdf';

/**
 * generateResume – creates a professional one-page resume PDF
 * from Abishake A's portfolio data and triggers a browser download.
 */
export default function generateResume() {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const W = 210;  // A4 width
    const margin = 18;
    const col = W - 2 * margin;
    let y = 20;

    // ──── Color palette ────
    const dark = [30, 27, 75];      // #1e1b4b
    const accent = [99, 102, 241];  // #6366f1
    const text = [51, 65, 85];      // #334155
    const muted = [100, 116, 139];  // #64748b
    const white = [255, 255, 255];

    // ──── Header background ────
    doc.setFillColor(...dark);
    doc.rect(0, 0, W, 52, 'F');

    // Name
    doc.setTextColor(...white);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('ABISHAKE A', margin, y + 8);

    // Title
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(165, 180, 252); // light indigo
    doc.text('Data Analyst  |  Python  |  Power BI  |  Tableau  |  SPSS  |  Excel', margin, y + 17);

    // Contact line
    doc.setFontSize(8.5);
    doc.setTextColor(200, 200, 220);
    doc.text('Chennai, Tamil Nadu, India', margin, y + 25);
    doc.text('abishakeorizistech@gmail.com', margin + 55, y + 25);
    doc.text('linkedin.com/in/abishake-a-97a857382', margin + 120, y + 25);

    // Accent bar
    doc.setFillColor(...accent);
    doc.rect(0, 52, W, 1.5, 'F');

    y = 62;

    // ──── Helper: Section title ────
    function sectionTitle(title) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...accent);
        doc.text(title, margin, y);
        doc.setDrawColor(...accent);
        doc.setLineWidth(0.4);
        doc.line(margin, y + 1.5, margin + col, y + 1.5);
        y += 8;
    }

    // ──── Helper: Body text ────
    function bodyText(str, indent = 0) {
        doc.setFontSize(9.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...text);
        const lines = doc.splitTextToSize(str, col - indent);
        doc.text(lines, margin + indent, y);
        y += lines.length * 4.5;
    }

    // ──── Helper: Bold label + normal value ────
    function labelValue(label, value) {
        doc.setFontSize(9.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...text);
        doc.text(label, margin, y);
        const labelW = doc.getTextWidth(label + ' ');
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...muted);
        doc.text(value, margin + labelW, y);
        y += 5;
    }

    // ──── PROFESSIONAL SUMMARY ────
    sectionTitle('PROFESSIONAL SUMMARY');
    bodyText(
        'Dynamic Data Analyst currently working at Orizis Tech Solutions Pvt. Ltd. Skilled in Python, MATLAB, SPSS, Tableau, Power BI, Advanced Excel, and Unity. Experienced in statistical analysis, predictive modeling, and business intelligence reporting. Passionate about transforming raw data into actionable insights that drive business growth.'
    );
    y += 3;

    // ──── WORK EXPERIENCE ────
    sectionTitle('WORK EXPERIENCE');

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...dark);
    doc.text('Data Analyst', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...muted);
    doc.text('June 2025 – Present', W - margin - doc.getTextWidth('June 2025 – Present'), y);
    y += 5;
    doc.setFontSize(9.5);
    doc.setTextColor(...accent);
    doc.text('Orizis Tech Solutions Pvt. Ltd.', margin, y);
    y += 5;
    bodyText('• Performing statistical analysis, predictive modeling, and BI reporting using Python, Power BI, and Tableau.', 3);
    bodyText('• Building interactive dashboards and automating data pipelines for client projects.', 3);
    y += 2;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...dark);
    doc.text('Technical Assistant', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...muted);
    doc.text('2021 – 2025', W - margin - doc.getTextWidth('2021 – 2025'), y);
    y += 5;
    doc.setFontSize(9.5);
    doc.setTextColor(...accent);
    doc.text('Government of Tamil Nadu', margin, y);
    y += 5;
    bodyText('• Provided technical support and data management services for government departments.', 3);
    bodyText('• Handled report generation and statistical analysis using Excel, SPSS, and MATLAB.', 3);
    y += 2;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...dark);
    doc.text('Graphic Designer', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...muted);
    doc.text('2016 – 2019', W - margin - doc.getTextWidth('2016 – 2019'), y);
    y += 5;
    doc.setFontSize(9.5);
    doc.setTextColor(...accent);
    doc.text('Altra Graphix', margin, y);
    y += 5;
    bodyText('• Created visual designs for branding, marketing, and digital media.', 3);
    bodyText('• Developed proficiency in visual storytelling and data visualization principles.', 3);
    y += 3;

    // ──── SKILLS ────
    sectionTitle('SKILLS');

    const skillGroups = [
        { label: 'Programming:', skills: 'Python, MATLAB' },
        { label: 'Analytics Tools:', skills: 'Power BI, Tableau, SPSS, Advanced Excel' },
        { label: 'Other:', skills: 'Unity, Data Visualization, Predictive Modeling, Statistical Analysis' },
    ];

    skillGroups.forEach((g) => {
        labelValue(g.label, g.skills);
    });
    y += 3;

    // ──── PROJECTS ────
    sectionTitle('KEY PROJECTS');

    const projects = [
        { name: 'Tourism Data Analysis', tools: 'SPSS, Excel', desc: 'Analyzed tourism trends and seasonal patterns to support stakeholder decisions.' },
        { name: 'Netflix Data Analysis', tools: 'Python, Pandas', desc: 'Exploratory analysis of genres, release trends, and viewer rating patterns.' },
        { name: 'Supply Chain Optimization Model', tools: 'Python, Scikit-learn, Power BI', desc: 'Predictive model reducing forecasted delivery delays by 18%.' },
        { name: 'Business Intelligence Dashboard', tools: 'Power BI, SQL, DAX', desc: 'Interactive real-time sales monitoring dashboard with automated refresh.' },
    ];

    projects.forEach((p) => {
        doc.setFontSize(9.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...dark);
        doc.text(`${p.name}`, margin, y);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...muted);
        doc.text(` (${p.tools})`, margin + doc.getTextWidth(p.name + ' '), y);
        y += 4.5;
        bodyText('  ' + p.desc, 3);
        y += 1;
    });

    // ──── Footer line ────
    doc.setDrawColor(...accent);
    doc.setLineWidth(0.3);
    doc.line(margin, 285, W - margin, 285);
    doc.setFontSize(7.5);
    doc.setTextColor(...muted);
    doc.text('Generated from portfolio | abishakeorizistech@gmail.com', W / 2, 289, { align: 'center' });

    // ──── Download ────
    doc.save('Abishake_A_Resume.pdf');
}
