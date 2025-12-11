
package dashboarddeliverysystem;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.swing.JOptionPane;
import javax.swing.SwingConstants;
import javax.swing.table.DefaultTableCellRenderer;
import javax.swing.table.DefaultTableModel;


public class Form1Menu extends javax.swing.JPanel {
public static Form1Menu instance;


    public Form1Menu() {
        initComponents();
        connect();
        refreshDashboard();
         instance = this;
         loadSummaryTable(); 
      
         
         
         
         
         
         
         
         
         
         // Row height
jTable1.setRowHeight(28);

// Remove grid lines
jTable1.setShowGrid(false);
jTable1.setIntercellSpacing(new Dimension(0, 0));

// Make it non-editable
jTable1.setDefaultEditor(Object.class, null);

// Center-align the Value column
DefaultTableCellRenderer centerRenderer = new DefaultTableCellRenderer();
centerRenderer.setHorizontalAlignment(SwingConstants.CENTER);
jTable1.getColumnModel().getColumn(1).setCellRenderer(centerRenderer);

// Bold for the left column
DefaultTableCellRenderer boldRenderer = new DefaultTableCellRenderer();
boldRenderer.setFont(new Font("Segoe UI", Font.BOLD, 14));
jTable1.getColumnModel().getColumn(0).setCellRenderer(boldRenderer);

// Table colors
jTable1.setBackground(Color.WHITE);
jTable1.setForeground(Color.DARK_GRAY);

jTable1.setSelectionBackground(new Color(225, 225, 225));
jTable1.setSelectionForeground(Color.BLACK);

// Disable column reordering
jTable1.getTableHeader().setReorderingAllowed(false);

// Make header look clean
jTable1.getTableHeader().setOpaque(false);
jTable1.getTableHeader().setBackground(new Color(240, 240, 240));
jTable1.getTableHeader().setFont(new Font("Segoe UI", Font.BOLD, 14));

         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         

    }

    
Connection con;
PreparedStatement pst;
ResultSet rs;
    



public void connect() {
    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        con = DriverManager.getConnection(
    "jdbc:mysql://localhost:3306/DashboardSystem?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC",
    "skyGarden",
    "@Asterisk2444"
);


        System.out.println("Connected to DashboardSystem!");
    } catch (Exception ex) {
        JOptionPane.showMessageDialog(this, "Connection Error: " + ex.getMessage());
        ex.printStackTrace();
    }
}








public void loadSummaryTable() {
    DefaultTableModel model = new DefaultTableModel();
    model.addColumn("Metric");
    model.addColumn("Value");

    model.addRow(new Object[]{"Total Deliveries", lblTotal.getText()});
    model.addRow(new Object[]{"Pending Deliveries", lblPending.getText()});
    model.addRow(new Object[]{"Completed Deliveries", lblCompleted.getText()});
    model.addRow(new Object[]{"Total Customers", lblCustomers.getText()});

    jTable1.setModel(model);
}















public void refreshDashboard() {
    if (con == null) {
       
        System.out.println("refreshDashboard: no DB connection available.");
        return;
    }

    try {
     
        String sqlTotal = "SELECT COUNT(*) FROM deliveries";
        try (PreparedStatement pst1 = con.prepareStatement(sqlTotal);
             ResultSet rs1 = pst1.executeQuery()) {
            if (rs1.next()) {
                lblTotal.setText(String.valueOf(rs1.getInt(1)));
            } else {
                lblTotal.setText("0");
            }
        }

      
        String sqlCompleted = "SELECT COUNT(*) FROM deliveries WHERE TRIM(LOWER(status)) = 'complete' OR TRIM(LOWER(status)) = 'completed'";
        try (PreparedStatement pst2 = con.prepareStatement(sqlCompleted);
             ResultSet rs2 = pst2.executeQuery()) {
            if (rs2.next()) {
                lblCompleted.setText(String.valueOf(rs2.getInt(1)));
            } else {
                lblCompleted.setText("0");
            }
        }

      
        String sqlPending = "SELECT COUNT(*) FROM deliveries WHERE TRIM(LOWER(status)) = 'pending'";
        try (PreparedStatement pst3 = con.prepareStatement(sqlPending);
             ResultSet rs3 = pst3.executeQuery()) {
            if (rs3.next()) {
                lblPending.setText(String.valueOf(rs3.getInt(1)));
            } else {
                lblPending.setText("0");
            }
        }

  
String sqlCustomers = "SELECT COUNT(*) FROM customers";
try (PreparedStatement pst4 = con.prepareStatement(sqlCustomers);
     ResultSet rs4 = pst4.executeQuery()) {
    if (rs4.next()) {
        lblCustomers.setText(String.valueOf(rs4.getInt(1)));
    } else {
        lblCustomers.setText("0");
    }
}




    } catch (Exception e) {
        e.printStackTrace();
        System.out.println("Dashboard refresh error: " + e.getMessage());
    }
}



  

    
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jScrollPane1 = new javax.swing.JScrollPane();
        jTable1 = new javax.swing.JTable();
        jPanel1 = new javax.swing.JPanel();
        jLabel1 = new javax.swing.JLabel();
        lblTotal = new javax.swing.JLabel();
        jPanel2 = new javax.swing.JPanel();
        lblCustomers = new javax.swing.JLabel();
        jLabel4 = new javax.swing.JLabel();
        jPanel3 = new javax.swing.JPanel();
        lblPending = new javax.swing.JLabel();
        jLabel2 = new javax.swing.JLabel();
        jPanel4 = new javax.swing.JPanel();
        jLabel3 = new javax.swing.JLabel();
        lblCompleted = new javax.swing.JLabel();

        setBackground(new java.awt.Color(255, 255, 255));
        setPreferredSize(new java.awt.Dimension(959, 570));

        jTable1.setBorder(javax.swing.BorderFactory.createBevelBorder(javax.swing.border.BevelBorder.RAISED));
        jTable1.setFont(new java.awt.Font("Segoe UI Light", 1, 14)); // NOI18N
        jTable1.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null}
            },
            new String [] {
                "Total Deliveries", "Pending Deliveries", "Completed Deliveries", "Total Customers"
            }
        ));
        jTable1.setShowGrid(true);
        jTable1.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                jTable1MouseClicked(evt);
            }
        });
        jScrollPane1.setViewportView(jTable1);

        jPanel1.setBorder(new javax.swing.border.SoftBevelBorder(javax.swing.border.BevelBorder.RAISED, null, new java.awt.Color(0, 0, 0), null, null));

        jLabel1.setFont(new java.awt.Font("Segoe UI", 0, 18)); // NOI18N
        jLabel1.setForeground(new java.awt.Color(0, 0, 0));
        jLabel1.setText("Total Deliveries");

        lblTotal.setBackground(new java.awt.Color(0, 0, 0));
        lblTotal.setFont(new java.awt.Font("Segoe UI", 1, 24)); // NOI18N
        lblTotal.setForeground(new java.awt.Color(0, 0, 0));
        lblTotal.setText("0");

        javax.swing.GroupLayout jPanel1Layout = new javax.swing.GroupLayout(jPanel1);
        jPanel1.setLayout(jPanel1Layout);
        jPanel1Layout.setHorizontalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addGap(33, 33, 33)
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(lblTotal)
                    .addComponent(jLabel1))
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
        jPanel1Layout.setVerticalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel1Layout.createSequentialGroup()
                .addGap(26, 26, 26)
                .addComponent(lblTotal)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 26, Short.MAX_VALUE)
                .addComponent(jLabel1)
                .addGap(25, 25, 25))
        );

        jPanel2.setBorder(javax.swing.BorderFactory.createBevelBorder(javax.swing.border.BevelBorder.RAISED, null, new java.awt.Color(51, 51, 51), null, null));

        lblCustomers.setBackground(new java.awt.Color(0, 0, 0));
        lblCustomers.setFont(new java.awt.Font("Segoe UI", 1, 24)); // NOI18N
        lblCustomers.setForeground(new java.awt.Color(0, 0, 0));
        lblCustomers.setText("0");

        jLabel4.setFont(new java.awt.Font("Segoe UI", 0, 18)); // NOI18N
        jLabel4.setForeground(new java.awt.Color(0, 0, 0));
        jLabel4.setText("Total Customers");

        javax.swing.GroupLayout jPanel2Layout = new javax.swing.GroupLayout(jPanel2);
        jPanel2.setLayout(jPanel2Layout);
        jPanel2Layout.setHorizontalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addGap(25, 25, 25)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jLabel4)
                    .addComponent(lblCustomers))
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
        jPanel2Layout.setVerticalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addGap(23, 23, 23)
                .addComponent(lblCustomers)
                .addGap(18, 18, 18)
                .addComponent(jLabel4)
                .addContainerGap(36, Short.MAX_VALUE))
        );

        jPanel3.setBorder(javax.swing.BorderFactory.createBevelBorder(javax.swing.border.BevelBorder.RAISED, null, new java.awt.Color(51, 51, 51), null, null));

        lblPending.setBackground(new java.awt.Color(0, 0, 0));
        lblPending.setFont(new java.awt.Font("Segoe UI", 1, 24)); // NOI18N
        lblPending.setForeground(new java.awt.Color(0, 0, 0));
        lblPending.setText("0");

        jLabel2.setBackground(new java.awt.Color(255, 255, 255));
        jLabel2.setFont(new java.awt.Font("Segoe UI", 0, 18)); // NOI18N
        jLabel2.setForeground(new java.awt.Color(0, 0, 0));
        jLabel2.setText("Pending Deliveries");

        javax.swing.GroupLayout jPanel3Layout = new javax.swing.GroupLayout(jPanel3);
        jPanel3.setLayout(jPanel3Layout);
        jPanel3Layout.setHorizontalGroup(
            jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel3Layout.createSequentialGroup()
                .addGap(41, 41, 41)
                .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jLabel2)
                    .addComponent(lblPending))
                .addContainerGap(66, Short.MAX_VALUE))
        );
        jPanel3Layout.setVerticalGroup(
            jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel3Layout.createSequentialGroup()
                .addGap(26, 26, 26)
                .addComponent(lblPending)
                .addGap(18, 18, 18)
                .addComponent(jLabel2)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );

        jPanel4.setBorder(javax.swing.BorderFactory.createBevelBorder(javax.swing.border.BevelBorder.RAISED, null, new java.awt.Color(51, 51, 51), null, null));
        jPanel4.setPreferredSize(new java.awt.Dimension(170, 140));

        jLabel3.setFont(new java.awt.Font("Segoe UI", 0, 18)); // NOI18N
        jLabel3.setForeground(new java.awt.Color(0, 0, 0));
        jLabel3.setText("Completed Deliveries");

        lblCompleted.setBackground(new java.awt.Color(0, 0, 0));
        lblCompleted.setFont(new java.awt.Font("Segoe UI", 1, 24)); // NOI18N
        lblCompleted.setForeground(new java.awt.Color(0, 0, 0));
        lblCompleted.setText("0");

        javax.swing.GroupLayout jPanel4Layout = new javax.swing.GroupLayout(jPanel4);
        jPanel4.setLayout(jPanel4Layout);
        jPanel4Layout.setHorizontalGroup(
            jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel4Layout.createSequentialGroup()
                .addGap(16, 16, 16)
                .addGroup(jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jLabel3)
                    .addComponent(lblCompleted))
                .addContainerGap(70, Short.MAX_VALUE))
        );
        jPanel4Layout.setVerticalGroup(
            jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel4Layout.createSequentialGroup()
                .addGap(22, 22, 22)
                .addComponent(lblCompleted)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 35, Short.MAX_VALUE)
                .addComponent(jLabel3)
                .addGap(22, 22, 22))
        );

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(this);
        this.setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(jScrollPane1)
                .addContainerGap())
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addGap(195, 195, 195)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addComponent(jPanel1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(jPanel3, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 76, Short.MAX_VALUE)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addComponent(jPanel2, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(jPanel4, javax.swing.GroupLayout.DEFAULT_SIZE, 264, Short.MAX_VALUE))
                .addGap(161, 161, 161))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addGap(33, 33, 33)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addComponent(jPanel1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jPanel4, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addComponent(jPanel3, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(jPanel2, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 141, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(124, 124, 124))
        );
    }// </editor-fold>//GEN-END:initComponents

    private void jTable1MouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_jTable1MouseClicked
        // TODO add your handling code here:
    }//GEN-LAST:event_jTable1MouseClicked


    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JPanel jPanel2;
    private javax.swing.JPanel jPanel3;
    private javax.swing.JPanel jPanel4;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JTable jTable1;
    private javax.swing.JLabel lblCompleted;
    private javax.swing.JLabel lblCustomers;
    private javax.swing.JLabel lblPending;
    private javax.swing.JLabel lblTotal;
    // End of variables declaration//GEN-END:variables
}
