using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.IO;
using System.Drawing;

namespace CreateSprite
{
    public partial class fmMain : Form
    {
        public fmMain()
        {
            InitializeComponent();
        }

        private void fmMain_Load(object sender, EventArgs e)
        {
            dlgOpen.InitialDirectory = Directory.GetCurrentDirectory();
        }

        private void btnAdd_Click(object sender, EventArgs e)
        {
            if (dlgOpen.ShowDialog() != DialogResult.OK) return;
            txAdd.Clear();
            foreach (string fn in dlgOpen.FileNames)
            {
                string n = Path.GetFileName(fn);
                txAdd.Text += string.Format("{0};", n);
            }

        }

        private void btnSave_Click(object sender, EventArgs e)
        {
            if (dlgOpen.FileNames.Length == 0) return;

            dlgSave.InitialDirectory = Path.GetDirectoryName(dlgOpen.FileNames[0]);
            if (dlgSave.ShowDialog() != DialogResult.OK) return;

            int col = int.Parse(txCol.Text);

            Image img = CreateSprite(col, dlgOpen.FileNames);
            img.Save(dlgSave.FileName);
        }

        Image CreateSprite(int col, string[] files)
        {
            Image img = null;
            int i = 0;
            int ux = 0;
            int uy = 0;
            

            foreach (string f in files)
            {
                Image src = Image.FromFile(f);

                if (img == null)
                {
                    if (col > files.Length) col = files.Length;
                    ux = src.Width;
                    uy = src.Height;

                    int row = files.Length / col + ((files.Length % col) > 0 ? 1 : 0);

                    int w = ux * col;
                    int h = uy * row;
                    img = new Bitmap(w, h, src.PixelFormat);
                }

                Rectangle rect = new Rectangle((i % col) * ux, (i / col) * uy, ux, uy);

                Graphics g = Graphics.FromImage(img);
                g.DrawImage(src, rect);
                g.Dispose();

                src.Dispose();
                i++;
            }


            return img;
        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void txCol_TextChanged(object sender, EventArgs e)
        {

        }

        private void label3_Click(object sender, EventArgs e)
        {

        }

        private void txAdd_TextChanged(object sender, EventArgs e)
        {

        }
    }
}
