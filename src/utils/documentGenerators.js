import jsPDF from 'jspdf';
import pptxgen from 'pptxgenjs';

export const generatePDF = (courseCode, courseName, topics, dueDate) => {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(255, 201, 4); // UCF Gold
    doc.rect(0, 0, 210, 20, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(courseName, 15, 13);

    doc.setFontSize(10);
    doc.text(`${courseCode} | Weekly Analysis Worksheet${dueDate ? ` | Due: ${new Date(dueDate).toLocaleDateString()}` : ''}`, 15, 26);
    doc.text(`Student Name:`, 140, 26);

    // Name Field
    const nameField = new doc.AcroForm.TextField();
    nameField.Rect = [165, 22, 30, 5];
    nameField.multiline = false;
    nameField.T = "StudentName";
    doc.addField(nameField);

    // Section 1: Trend Analysis
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(240, 240, 240);
    doc.rect(15, 35, 180, 8, 'F');
    doc.text("1. Market Trend Analysis", 18, 41);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text("Paste your Google Trends screenshot below and describe the key inflection points.", 15, 50);
    doc.setDrawColor(200, 200, 200);
    doc.rect(15, 55, 180, 60); // Placeholder box
    doc.text("[ Paste Screenshot Here ]", 90, 85, { align: 'center' });

    doc.text("Key Findings:", 15, 125);
    // Findings Field - Multiline
    const findingsField = new doc.AcroForm.TextField();
    findingsField.Rect = [15, 128, 180, 30];
    findingsField.multiline = true;
    findingsField.T = "KeyFindings";
    doc.addField(findingsField);

    // Draw visual box for field
    doc.rect(15, 128, 180, 30);

    // Section 2: Competitor Benchmarking
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(240, 240, 240);
    doc.rect(15, 165, 180, 8, 'F');
    doc.text("2. Competitor Benchmarking", 18, 171);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Compare metrics for: ${topics.join(', ')}`, 15, 180);

    // Simple Table Header
    doc.setFont('helvetica', 'bold');
    doc.text("Brand/Topic", 15, 190);
    doc.text("Engagement Rate", 80, 190);
    doc.text("Sentiment (Pos/Neg)", 140, 190);
    doc.line(15, 192, 195, 192);

    // Table Rows
    doc.setFont('helvetica', 'normal');
    let y = 200;
    topics.slice(0, 3).forEach((topic, index) => {
        doc.text(topic, 15, y);

        // Engagement Field
        const engField = new doc.AcroForm.TextField();
        engField.Rect = [80, y - 4, 40, 5];
        engField.multiline = false;
        engField.T = `Engagement_${index}`;
        doc.addField(engField);
        doc.rect(80, y - 4, 40, 5); // Visual box

        // Sentiment Field
        const sentField = new doc.AcroForm.TextField();
        sentField.Rect = [140, y - 4, 40, 5];
        sentField.multiline = false;
        sentField.T = `Sentiment_${index}`;
        doc.addField(sentField);
        doc.rect(140, y - 4, 40, 5); // Visual box

        y += 10;
    });

    // Section 3: Recommendations
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(240, 240, 240);
    doc.rect(15, 230, 180, 8, 'F');
    doc.text("3. Strategic Recommendations", 18, 236);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text("Based on the data above, what actions should the brand take?", 15, 245);

    // Recommendations Field
    const recField = new doc.AcroForm.TextField();
    recField.Rect = [15, 248, 180, 30];
    recField.multiline = true;
    recField.T = "Recommendations";
    doc.addField(recField);
    doc.rect(15, 248, 180, 30); // Visual box

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Generated via UCF Rosen College Technology Fellowship Toolkit", 105, 290, { align: 'center' });

    doc.save(`${courseCode.replace(' ', '_')}_Worksheet_Fillable.pdf`);
};

export const generatePPTX = async (courseCode, courseName, topics, dueDate) => {
    const pres = new pptxgen();

    // Layout
    pres.layout = 'LAYOUT_16x9';

    // Slide 1: Title
    let slide1 = pres.addSlide();
    slide1.background = { color: '000000' }; // UCF Black
    slide1.addText(courseName, { x: 1, y: 3, w: '80%', fontSize: 36, color: 'FFC904', bold: true }); // UCF Gold
    slide1.addText('Weekly Digital Audit', { x: 1, y: 4, w: '80%', fontSize: 24, color: 'FFFFFF' });
    slide1.addText(`${courseCode} | [Student Name]${dueDate ? ` | Due: ${new Date(dueDate).toLocaleDateString()}` : ''}`, { x: 1, y: 6, fontSize: 14, color: 'CCCCCC' });

    // Slide 2: Search Trends
    let slide2 = pres.addSlide();
    slide2.addText('Search Volume Analysis', { x: 0.5, y: 0.5, fontSize: 24, color: '000000', bold: true });
    slide2.addShape(pres.ShapeType.rect, { x: 0.5, y: 0.8, w: 10, h: 0.05, fill: { color: 'FFC904' } });
    slide2.addText('Insert your Google Trends chart here', { x: 2, y: 3, w: 6, h: 3, fill: { color: 'F0F0F0' }, align: 'center', color: '999999' });
    slide2.addText('Key Insight:', { x: 8.5, y: 1.5, fontSize: 18, bold: true });
    slide2.addText('• [Bullet point 1]', { x: 8.5, y: 2, fontSize: 14 });
    slide2.addText('• [Bullet point 2]', { x: 8.5, y: 2.5, fontSize: 14 });

    // Slide 3: Competitor Comparison
    let slide3 = pres.addSlide();
    slide3.addText('Competitor Benchmarking', { x: 0.5, y: 0.5, fontSize: 24, color: '000000', bold: true });
    slide3.addShape(pres.ShapeType.rect, { x: 0.5, y: 0.8, w: 10, h: 0.05, fill: { color: 'FFC904' } });

    let rows = [
        [{ text: 'Brand', options: { bold: true } }, { text: 'Engagement', options: { bold: true } }, { text: 'Sentiment', options: { bold: true } }],
        ...topics.map(t => [t, '', ''])
    ];
    slide3.addTable(rows, { x: 1, y: 1.5, w: 9, fill: { color: 'F9F9F9' }, border: { pt: 1, color: 'CCCCCC' } });

    await pres.writeFile({ fileName: `${courseCode.replace(' ', '_')}_Presentation.pptx` });
};
