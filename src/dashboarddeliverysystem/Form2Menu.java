    
package dashboarddeliverysystem;


import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.Window;
import java.sql.DriverManager;
import javax.swing.JOptionPane;
import javax.swing.SwingUtilities;
import javax.swing.table.DefaultTableModel;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.RowFilter;
import javax.swing.border.LineBorder;
import javax.swing.table.TableRowSorter;




public class Form2Menu extends javax.swing.JPanel {


     
     
     
   private int hoveredRow = -1;

   private Form22Menu form22;
   private Customer selectedCustomer;

   
  public Form2Menu() {
       

    initComponents();       
    jComboBox2.addActionListener(e -> updateCustomerFieldsFromCombo());
    connect();          
    setCustomTableModel(); 
    loadCustomers();  
    loadDeliveries();
    

    

 
    enablesDeleteKey(); 
    enableTableEditing(); 
    setupPlaceholder(); 
    setupSearch();
    
        TableRowSorter<DefaultTableModel> sorter = new TableRowSorter<>((DefaultTableModel) tblDelivery.getModel());
        tblDelivery.setRowSorter(sorter);

        
    
    
     JPanel formPanel = new JPanel();
formPanel.setBorder(new LineBorder(Color.LIGHT_GRAY, 1, true));
   
        
        
        
        
StatusColorRenderer renderer = new StatusColorRenderer();


for (int i = 0; i < tblDelivery.getColumnCount(); i++) {
    tblDelivery.getColumnModel().getColumn(i).setCellRenderer(renderer);
}






        
        
        
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        txtDate.setEditable(false);
        txtDate.setText(format.format(new java.util.Date()));

        new javax.swing.Timer(60000, e -> {
            txtDate.setText(format.format(new java.util.Date()));
        }).start();

        
        jComboBox2.addActionListener(e -> updateCustomerFieldsFromCombo());
        
        
        
        //here
        
        tblDelivery.addMouseListener(new java.awt.event.MouseAdapter() {
    @Override
    public void mouseClicked(java.awt.event.MouseEvent evt) {
        int row = tblDelivery.getSelectedRow();
        if (row != -1) {
            txtCustomerName.setText(tblDelivery.getValueAt(row, 2).toString());
            jTextPane3.setText(tblDelivery.getValueAt(row, 3).toString());
            cmbStatus.setSelectedItem(tblDelivery.getValueAt(row, 4).toString());
            txtDate.setText(tblDelivery.getValueAt(row, 5).toString());
        }
    }
});

        
        cmbStatus.addKeyListener(new java.awt.event.KeyAdapter() {
    @Override
    public void keyPressed(java.awt.event.KeyEvent evt) {
        if (evt.getKeyCode() == java.awt.event.KeyEvent.VK_ENTER) {
            updateStatus();
        }
    }
});

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        tblDelivery.addMouseMotionListener(new java.awt.event.MouseMotionAdapter() {
    @Override
    public void mouseMoved(java.awt.event.MouseEvent e) {
        hoveredRow = tblDelivery.rowAtPoint(e.getPoint());
        tblDelivery.repaint();
    }
});

tblDelivery.addMouseListener(new java.awt.event.MouseAdapter() {
    @Override
    public void mouseExited(java.awt.event.MouseEvent e) {
        hoveredRow = -1;
        tblDelivery.repaint();
    }
});

        
        
        
        
        
        
        
        
    
        
        
        
        
        
        
        
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

public void loadCustomers() {
   String sql = "SELECT customer_id, name, phone, address FROM customers ORDER BY customer_id DESC";


    try {
        pst = con.prepareStatement(sql);
        rs = pst.executeQuery();

        DefaultTableModel model = (DefaultTableModel) customerTable.getModel();
        model.setRowCount(0);

    
        CustomerData.customers.clear();

        while (rs.next()) {
            int id = rs.getInt("customer_id");
            String name = rs.getString("name");
            String phone = rs.getString("phone");
            String address = rs.getString("address");

       
            model.addRow(new Object[]{ id, name, phone, address });

      
            CustomerData.customers.add(new Customer(id, name, phone, address));
        }

    
        SwingUtilities.invokeLater(this::reloadCustomerComboBox);

    } catch (SQLException e) {
        JOptionPane.showMessageDialog(this, "Error loading customers: " + e.getMessage());
        e.printStackTrace();
    }
}




public void insertDeliveryIntoDB(String deliveryID, int customerID, String customerName,
                                 String address, String status, String dateStr) {

    String sql = "INSERT INTO deliveries (delivery_code, customer_id, customer_name, address, delivery_date, status) "
               + "VALUES (?, ?, ?, ?, ?, ?)";

    PreparedStatement p = null;
    try {
        p = con.prepareStatement(sql);
        p.setString(1, deliveryID);
        p.setInt(2, customerID);
        p.setString(3, customerName);
        p.setString(4, address);
        
        
        java.sql.Date sqlDate = null;
        try {
            java.util.Date utilDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dateStr);
            sqlDate = new java.sql.Date(utilDate.getTime());
        } catch (Exception ex) {
        
            sqlDate = null;
        }
        if (sqlDate != null) {
            p.setDate(5, sqlDate);
        } else {
            p.setNull(5, java.sql.Types.DATE);
        }

        p.setString(6, status);
        p.executeUpdate();
        System.out.println("Delivery saved to database.");
    } catch (SQLException e) {
        JOptionPane.showMessageDialog(this, "Error inserting delivery: " + e.getMessage());
        e.printStackTrace();
    } finally {
        if (p != null) {
            try { p.close(); } catch (SQLException ignored) {}
        }
    }
}








public void loadDeliveries() {
    String sql = "SELECT delivery_code, customer_id, customer_name, address, delivery_date, status "
               + "FROM deliveries "
               + "ORDER BY CAST(SUBSTRING(delivery_code, 3) AS UNSIGNED) DESC";

    try {
        PreparedStatement pst = con.prepareStatement(sql);
        ResultSet rs = pst.executeQuery();

        DefaultTableModel model = (DefaultTableModel) tblDelivery.getModel();
        model.setRowCount(0);

        while (rs.next()) {
            String deliveryCode = rs.getString("delivery_code");
            int customerID = rs.getInt("customer_id");
            String customerName = rs.getString("customer_name");
            String address = rs.getString("address");
            String date = rs.getString("delivery_date");
            String status = rs.getString("status");

            model.addRow(new Object[]{
                deliveryCode,
                customerID,
                customerName,
                address,
                status,
                date
            });
        }

        rs.close();
        pst.close();

    } catch (Exception e) {
        JOptionPane.showMessageDialog(this, "Error loading deliveries: " + e.getMessage());
    }
}







private void updateStatus() {
    int row = tblDelivery.getSelectedRow();
    if (row == -1) {
        JOptionPane.showMessageDialog(this, "Please select a delivery.");
        return;
    }

    String newStatus = cmbStatus.getSelectedItem().toString();
    String deliveryCode = tblDelivery.getValueAt(row, 0).toString();

    try (Connection conn = DriverManager.getConnection(
            "jdbc:mysql://localhost:3306/DashboardSystem",
            "skyGarden",
            "@Asterisk2444"
        )) {

        // -------------------------------------------------
        // 1. UPDATE DELIVERY STATUS
        // -------------------------------------------------
        String sql = "UPDATE deliveries SET status = ? WHERE delivery_code = ?";
        PreparedStatement p = conn.prepareStatement(sql);
        p.setString(1, newStatus);
        p.setString(2, deliveryCode);
        p.executeUpdate();

        // Update table UI
        tblDelivery.setValueAt(newStatus, row, 4);

        // -------------------------------------------------
        // 2. INSERT LOG ENTRY
        // -------------------------------------------------
        String logSql = "INSERT INTO logs (action_type, description, timestamp) "
                      + "VALUES (?, ?, NOW())";

        PreparedStatement log = conn.prepareStatement(logSql);

        switch (newStatus.toLowerCase()) {
            case "complete":
                log.setString(1, "Delivery Completed");
                log.setString(2, "Marked Delivery #" + deliveryCode + " as Completed");
                break;

            case "failed":
                log.setString(1, "Delivery Failed");
                log.setString(2, "Marked Delivery #" + deliveryCode + " as Failed");
                break;

            case "pending":
                log.setString(1, "Delivery Pending");
                log.setString(2, "Marked Delivery #" + deliveryCode + " as Pending");
                break;

            default:
                log.setString(1, "Status Updated");
                log.setString(2, "Updated Delivery #" + deliveryCode + " to " + newStatus);
        }

        log.executeUpdate();

        // -------------------------------------------------
        // 3. REFRESH LOG TABLE IN FORM1 (if open)
        // -------------------------------------------------
        try {
            Form1Menu.instance.loadLogsTable();
        } catch (Exception ignore) {
            // Form1 not opened — ignore
        }

        JOptionPane.showMessageDialog(this, "Status updated successfully!");

    } catch (Exception e) {
        e.printStackTrace();
    }
}












//Customer Side




private void setCustomTableModel() {
    DefaultTableModel model = new DefaultTableModel(
        new Object[]{"Customer ID", "Customer Name", "Phone no.", "Address"},
        0
    ) {
        @Override
        public boolean isCellEditable(int row, int col) {
            return col != 0; 
        }
    };

    customerTable.setModel(model);
}








public void enableTableEditing() {
    customerTable.getModel().addTableModelListener(e -> {
        if (e.getType() == javax.swing.event.TableModelEvent.UPDATE) {
            int row = e.getFirstRow();
            int col = e.getColumn();

            DefaultTableModel model = (DefaultTableModel) customerTable.getModel();

            int id = (int) model.getValueAt(row, 0);           
            String name = (String) model.getValueAt(row, 1);
            String phone = (String) model.getValueAt(row, 2);
            String address = (String) model.getValueAt(row, 3);

            try {
                String sql = "UPDATE customers SET name=?, phone=?, address=? WHERE customer_id=?";
                pst = con.prepareStatement(sql);
                pst.setString(1, name);
                pst.setString(2, phone);
                pst.setString(3, address);
                pst.setInt(4, id);
                pst.executeUpdate();

                System.out.println("Updated customer ID: " + id);

            } catch (SQLException ex) {
                JOptionPane.showMessageDialog(this, "Update failed: " + ex.getMessage());
            }
        }
    });
}





private void enablesDeleteKey() {
    tblDelivery.addKeyListener(new java.awt.event.KeyAdapter() {
        @Override
        public void keyPressed(java.awt.event.KeyEvent evt) {

            if (evt.getKeyCode() == java.awt.event.KeyEvent.VK_DELETE) {

                int row = tblDelivery.getSelectedRow();
                if (row == -1) return;

                String deliveryCode = tblDelivery.getValueAt(row, 0).toString();

                int confirm = JOptionPane.showConfirmDialog(
                        null,
                        "Delete delivery: " + deliveryCode + "?",
                        "Confirm Delete",
                        JOptionPane.YES_NO_OPTION
                );

                if (confirm == JOptionPane.YES_OPTION) {
                    try {
                        Connection conn = DriverManager.getConnection(
                                "jdbc:mysql://localhost:3306/DashboardSystem",
                                "skyGarden",
                                "@Asterisk2444"
                        );

                        PreparedStatement pst = conn.prepareStatement(
                                "DELETE FROM deliveries WHERE delivery_code = ?"
                        );

                        pst.setString(1, deliveryCode);
                        pst.executeUpdate();

                        // Remove from UI
                        ((DefaultTableModel) tblDelivery.getModel()).removeRow(row);

                        JOptionPane.showMessageDialog(null, "Delivery deleted.");

                        // ---------------------------------------
                        // ⭐ LOGGING CODE (DELETE ACTION)
                        // ---------------------------------------
                        String logSql = "INSERT INTO logs (action_type, description, timestamp) VALUES (?, ?, NOW())";
                        PreparedStatement logPst = conn.prepareStatement(logSql);

                        logPst.setString(1, "Delivery Deleted");
                        logPst.setString(2, "Deleted Delivery #" + deliveryCode);
                        logPst.executeUpdate();

                        // Refresh Form1 logs instantly
                        Form1Menu.instance.loadLogsTable();
                        // ---------------------------------------

                    } catch (Exception ex) {
                        JOptionPane.showMessageDialog(null, "Delete failed: " + ex.getMessage());
                    }
                }
            }
        }
    });
}













public void loadCustomerTable() {
    DefaultTableModel model = (DefaultTableModel) customerTable.getModel();
    model.setRowCount(0);

    for (Customer c : CustomerData.customers) {
        model.addRow(new Object[]{
            c.getId(),
            c.getName(),
            c.getPhone(),
            c.getAddress()
        });
    }
}




private void openCustomerPopup() {
    Form22Menu popup = new Form22Menu();

    DefaultTableModel customerModel = (DefaultTableModel) customerTable.getModel();
    popup.loadCustomersFrom(customerModel);

    Window parentWindow = SwingUtilities.getWindowAncestor(this);
    JDialog dialog = new JDialog(
            parentWindow,
            "Select Customer",
            java.awt.Dialog.ModalityType.APPLICATION_MODAL
    );

    dialog.setDefaultCloseOperation(JDialog.DISPOSE_ON_CLOSE);
    dialog.getContentPane().add(popup);

    dialog.pack();
    dialog.setSize(920, 560);
    dialog.setLocationRelativeTo(this);

    dialog.setVisible(true);   


    Customer selected = popup.getSelectedCustomer();

    if (selected != null) {
        jComboBox2.setSelectedItem(String.valueOf(selected.getId())); 
        txtCustomerName.setText(selected.getName());
        txtAddress.setText(selected.getAddress());
    }
}



//Combocbx

private void updateCustomerFieldsFromCombo() {
    if (jComboBox2.getSelectedIndex() <= 0) {
   
        txtCustomerName.setText("");
        jTextPane3.setText("");
        return;
    }

    String selected = jComboBox2.getSelectedItem().toString();

    int id = Integer.parseInt(selected.split(" - ")[0]);

    for (Customer c : CustomerData.customers) {
        if (c.getId() == id) {
            txtCustomerName.setText(c.getName());
            jTextPane3.setText(c.getAddress());
            break;
        }
    }
}







class StatusColorRenderer extends javax.swing.table.DefaultTableCellRenderer {

    @Override
    public java.awt.Component getTableCellRendererComponent(
            javax.swing.JTable table, Object value, boolean isSelected,
            boolean hasFocus, int row, int column) {

        java.awt.Component c = super.getTableCellRendererComponent(
                table, value, isSelected, hasFocus, row, column);

        String status = table.getValueAt(row, 4).toString().trim().toLowerCase();

        // Debug (optional)
        // System.out.println("STATUS = [" + status + "]");

        // HOVER
        if (row == hoveredRow && !isSelected) {
            c.setBackground(new java.awt.Color(230, 230, 230));
            return c;
        }

        if (!isSelected) {

            if (status.contains("complete")) {
                c.setBackground(new java.awt.Color(198, 239, 206)); // green

            } else if (status.contains("fail")) {
                c.setBackground(new java.awt.Color(255, 199, 206)); // red

            } else if (status.contains("pending") ||
                       status.contains("progress") ||
                       status.contains("hold")) {

                c.setBackground(new java.awt.Color(255, 235, 156)); // yellow

            } else {
                c.setBackground(java.awt.Color.WHITE);
            }

            c.setForeground(java.awt.Color.BLACK);
        }

        return c;
    }
}














//Delivery Management Side

public String generateDeliveryID() {
    String newID = "D-001";
    String sql = "SELECT delivery_code FROM deliveries "
               + "ORDER BY CAST(SUBSTRING(delivery_code, 3) AS UNSIGNED) DESC LIMIT 1";
    try (PreparedStatement pst = con.prepareStatement(sql);
         ResultSet rs = pst.executeQuery()) {
        if (rs.next()) {
            String lastID = rs.getString("delivery_code"); 
            int num = Integer.parseInt(lastID.substring(2));
            num++; 
            newID = String.format("D-%03d", num);
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
    return newID;
}







    
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        tabManagement = new javax.swing.JTabbedPane();
        jPanel1 = new javax.swing.JPanel();
        jScrollPane1 = new javax.swing.JScrollPane();
        customerTable = new javax.swing.JTable();
        jLabel3 = new javax.swing.JLabel();
        jLabel4 = new javax.swing.JLabel();
        jLabel5 = new javax.swing.JLabel();
        btnAdd = new javax.swing.JButton();
        jPanel3 = new javax.swing.JPanel();
        jLabel1 = new javax.swing.JLabel();
        jLabel11 = new javax.swing.JLabel();
        jTextField1 = new javax.swing.JTextField();
        txtPhone = new javax.swing.JTextField();
        txtName = new javax.swing.JTextField();
        txtAddress = new javax.swing.JTextField();
        jPanel2 = new javax.swing.JPanel();
        jScrollPane2 = new javax.swing.JScrollPane();
        tblDelivery = new javax.swing.JTable();
        jLabel6 = new javax.swing.JLabel();
        jLabel7 = new javax.swing.JLabel();
        jLabel8 = new javax.swing.JLabel();
        jLabel9 = new javax.swing.JLabel();
        jLabel10 = new javax.swing.JLabel();
        jButton1 = new javax.swing.JButton();
        cmbStatus = new javax.swing.JComboBox<>();
        jComboBox2 = new javax.swing.JComboBox<>();
        btnPopup = new javax.swing.JButton();
        jPanel4 = new javax.swing.JPanel();
        jLabel2 = new javax.swing.JLabel();
        txtCustomerName = new javax.swing.JTextField();
        jTextPane3 = new javax.swing.JTextField();
        txtDate = new javax.swing.JTextField();
        cmbFilter = new javax.swing.JComboBox<>();

        setBackground(new java.awt.Color(255, 255, 255));

        jPanel1.setBackground(new java.awt.Color(255, 255, 255));

        customerTable.setBorder(javax.swing.BorderFactory.createBevelBorder(javax.swing.border.BevelBorder.RAISED));
        customerTable.setModel(new javax.swing.table.DefaultTableModel(
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
                {null, null, null, null},
                {null, null, null, null},
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
                "Customer ID", "Customer Name", "Phone no.", "Address"
            }
        ));
        customerTable.setShowGrid(true);
        jScrollPane1.setViewportView(customerTable);

        jLabel3.setText("Name:");

        jLabel4.setText("Phone:");

        jLabel5.setText("Address:");

        btnAdd.setText("Add");
        btnAdd.setBorder(new javax.swing.border.SoftBevelBorder(javax.swing.border.BevelBorder.RAISED));
        btnAdd.setCursor(new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR));
        btnAdd.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnAddActionPerformed(evt);
            }
        });

        jPanel3.setBorder(javax.swing.BorderFactory.createBevelBorder(javax.swing.border.BevelBorder.RAISED));
        jPanel3.setPreferredSize(new java.awt.Dimension(217, 35));

        jLabel1.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        jLabel1.setText("Customer Management");

        javax.swing.GroupLayout jPanel3Layout = new javax.swing.GroupLayout(jPanel3);
        jPanel3.setLayout(jPanel3Layout);
        jPanel3Layout.setHorizontalGroup(
            jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel3Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(jLabel1)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
        jPanel3Layout.setVerticalGroup(
            jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel3Layout.createSequentialGroup()
                .addComponent(jLabel1)
                .addGap(0, 10, Short.MAX_VALUE))
        );

        jLabel11.setText("Search:");

        jTextField1.setBackground(new java.awt.Color(255, 255, 255));
        jTextField1.setForeground(new java.awt.Color(255, 255, 255));

        txtPhone.setBackground(new java.awt.Color(255, 255, 255));

        txtName.setBackground(new java.awt.Color(255, 255, 255));

        txtAddress.setBackground(new java.awt.Color(255, 255, 255));

        javax.swing.GroupLayout jPanel1Layout = new javax.swing.GroupLayout(jPanel1);
        jPanel1.setLayout(jPanel1Layout);
        jPanel1Layout.setHorizontalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addGap(30, 30, 30)
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addComponent(jLabel4)
                    .addComponent(jLabel3)
                    .addComponent(jLabel5))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addComponent(txtPhone)
                    .addComponent(txtName)
                    .addComponent(txtAddress, javax.swing.GroupLayout.DEFAULT_SIZE, 374, Short.MAX_VALUE))
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addGap(18, 18, 18)
                        .addComponent(btnAdd, javax.swing.GroupLayout.PREFERRED_SIZE, 58, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addGap(54, 54, 54)
                        .addComponent(jLabel11, javax.swing.GroupLayout.PREFERRED_SIZE, 46, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(18, 18, 18)
                        .addComponent(jTextField1, javax.swing.GroupLayout.PREFERRED_SIZE, 356, javax.swing.GroupLayout.PREFERRED_SIZE)))
                .addContainerGap(171, Short.MAX_VALUE))
            .addComponent(jPanel3, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.DEFAULT_SIZE, 1100, Short.MAX_VALUE)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(jScrollPane1)
                .addContainerGap())
        );
        jPanel1Layout.setVerticalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addComponent(jPanel3, javax.swing.GroupLayout.PREFERRED_SIZE, 39, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addGap(31, 31, 31)
                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jTextField1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jLabel11))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 45, Short.MAX_VALUE)
                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(txtName, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jLabel3))
                        .addGap(18, 18, 18)
                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(txtPhone, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jLabel4))
                        .addGap(18, 18, 18)
                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(txtAddress, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jLabel5)
                            .addComponent(btnAdd))
                        .addGap(29, 29, 29)))
                .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 333, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(26, 26, 26))
        );

        tabManagement.addTab("Customer Management", jPanel1);

        jPanel2.setBackground(new java.awt.Color(255, 255, 255));

        tblDelivery.setBorder(javax.swing.BorderFactory.createBevelBorder(javax.swing.border.BevelBorder.RAISED));
        tblDelivery.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null, null, null},
                {null, null, null, null, null, null},
                {null, null, null, null, null, null},
                {null, null, null, null, null, null},
                {null, null, null, null, null, null},
                {null, null, null, null, null, null},
                {null, null, null, null, null, null},
                {null, null, null, null, null, null},
                {null, null, null, null, null, null},
                {null, null, null, null, null, null},
                {null, null, null, null, null, null},
                {null, null, null, null, null, null},
                {null, null, null, null, null, null},
                {null, null, null, null, null, null},
                {null, null, null, null, null, null},
                {null, null, null, null, null, null},
                {null, null, null, null, null, null},
                {null, null, null, null, null, null},
                {null, null, null, null, null, null},
                {null, null, null, null, null, null},
                {null, null, null, null, null, null},
                {null, null, null, null, null, null},
                {null, null, null, null, null, null},
                {null, null, null, null, null, null},
                {null, null, null, null, null, null},
                {null, null, null, null, null, null},
                {null, null, null, null, null, null}
            },
            new String [] {
                "Delivery ID", "Customer ID", "Customer Name", "Address", "Status", "Date"
            }
        ));
        tblDelivery.setShowGrid(true);
        jScrollPane2.setViewportView(tblDelivery);

        jLabel6.setText("Customer ID:");

        jLabel7.setText("Customer Name:");

        jLabel8.setText("Delivery Address:");

        jLabel9.setText("Status:");

        jLabel10.setText("Date:");

        jButton1.setText("Add delivery");
        jButton1.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton1ActionPerformed(evt);
            }
        });

        cmbStatus.setBackground(new java.awt.Color(255, 255, 255));
        cmbStatus.setForeground(new java.awt.Color(0, 0, 0));
        cmbStatus.setModel(new javax.swing.DefaultComboBoxModel<>(new String[] { "Pending ", "Complete", "Failed" }));

        jComboBox2.setBackground(new java.awt.Color(255, 255, 255));

        btnPopup.setText("Select customer");
        btnPopup.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnPopupActionPerformed(evt);
            }
        });

        jPanel4.setBorder(javax.swing.BorderFactory.createBevelBorder(javax.swing.border.BevelBorder.RAISED));

        jLabel2.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        jLabel2.setText("Delivery Management");

        javax.swing.GroupLayout jPanel4Layout = new javax.swing.GroupLayout(jPanel4);
        jPanel4.setLayout(jPanel4Layout);
        jPanel4Layout.setHorizontalGroup(
            jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel4Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(jLabel2)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
        jPanel4Layout.setVerticalGroup(
            jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel4Layout.createSequentialGroup()
                .addComponent(jLabel2)
                .addContainerGap(8, Short.MAX_VALUE))
        );

        txtCustomerName.setEditable(false);
        txtCustomerName.setBackground(new java.awt.Color(255, 255, 255));

        jTextPane3.setBackground(new java.awt.Color(255, 255, 255));

        txtDate.setBackground(new java.awt.Color(255, 255, 255));

        cmbFilter.setBackground(new java.awt.Color(255, 255, 255));
        cmbFilter.setForeground(new java.awt.Color(0, 0, 0));
        cmbFilter.setModel(new javax.swing.DefaultComboBoxModel<>(new String[] { "All", "Pending ", "Complete", "Failed" }));
        cmbFilter.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                cmbFilterActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout jPanel2Layout = new javax.swing.GroupLayout(jPanel2);
        jPanel2.setLayout(jPanel2Layout);
        jPanel2Layout.setHorizontalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jScrollPane2, javax.swing.GroupLayout.DEFAULT_SIZE, 1094, Short.MAX_VALUE)
                    .addGroup(jPanel2Layout.createSequentialGroup()
                        .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addGroup(jPanel2Layout.createSequentialGroup()
                                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addComponent(jLabel6)
                                    .addComponent(jLabel8)
                                    .addComponent(jLabel7)
                                    .addComponent(jLabel9)
                                    .addComponent(jLabel10))
                                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel2Layout.createSequentialGroup()
                                        .addGap(8, 8, 8)
                                        .addComponent(jComboBox2, javax.swing.GroupLayout.PREFERRED_SIZE, 190, javax.swing.GroupLayout.PREFERRED_SIZE))
                                    .addGroup(jPanel2Layout.createSequentialGroup()
                                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                                        .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                            .addComponent(cmbStatus, javax.swing.GroupLayout.Alignment.TRAILING, 0, 192, Short.MAX_VALUE)
                                            .addComponent(txtCustomerName)
                                            .addComponent(jTextPane3)
                                            .addComponent(txtDate)))))
                            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel2Layout.createSequentialGroup()
                                .addGap(36, 36, 36)
                                .addComponent(jButton1)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                .addComponent(btnPopup)))
                        .addGap(551, 551, 551)
                        .addComponent(cmbFilter, javax.swing.GroupLayout.PREFERRED_SIZE, 140, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)))
                .addContainerGap())
            .addComponent(jPanel4, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );
        jPanel2Layout.setVerticalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addComponent(jPanel4, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jComboBox2, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabel6))
                .addGap(25, 25, 25)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel7)
                    .addComponent(txtCustomerName, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(22, 22, 22)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel8)
                    .addComponent(jTextPane3, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(29, 29, 29)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(cmbStatus, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabel9))
                .addGap(18, 18, 18)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel2Layout.createSequentialGroup()
                        .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jLabel10)
                            .addComponent(txtDate, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGap(18, 18, 18))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel2Layout.createSequentialGroup()
                        .addComponent(cmbFilter, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(9, 9, 9)))
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jButton1)
                    .addComponent(btnPopup))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 17, Short.MAX_VALUE)
                .addComponent(jScrollPane2, javax.swing.GroupLayout.PREFERRED_SIZE, 253, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(16, 16, 16))
        );

        tabManagement.addTab("Delivery Management", jPanel2);

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(this);
        this.setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(tabManagement)
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addComponent(tabManagement, javax.swing.GroupLayout.PREFERRED_SIZE, 609, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(0, 0, Short.MAX_VALUE))
        );
    }// </editor-fold>//GEN-END:initComponents

    private void btnPopupActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnPopupActionPerformed
       Form22Menu popup = new Form22Menu();


DefaultTableModel customerModel = (DefaultTableModel) customerTable.getModel();
popup.loadCustomersFrom(customerModel);

//popup
Window parentWindow = SwingUtilities.getWindowAncestor(this);

JDialog dialog = new JDialog(
    parentWindow,
    "Select Customer",
    java.awt.Dialog.ModalityType.APPLICATION_MODAL
);

dialog.setDefaultCloseOperation(JDialog.DISPOSE_ON_CLOSE);
dialog.getContentPane().add(popup);

dialog.pack();
dialog.setSize(920, 560);
dialog.setLocationRelativeTo(this);

dialog.setVisible(true);  // waits until OK is clicked


Customer selected = popup.getSelectedCustomer();

if (selected != null) {

    reloadCustomerComboBox();


    String comboValue = selected.getId() + " - " + selected.getName();
    jComboBox2.setSelectedItem(comboValue);

    
    txtCustomerName.setText(selected.getName());
    jTextPane3.setText(selected.getAddress());
}

    }//GEN-LAST:event_btnPopupActionPerformed

    private void jButton1ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton1ActionPerformed
   
        
        
        
        
        
        
    DefaultTableModel model = (DefaultTableModel) tblDelivery.getModel();
    String deliveryID = generateDeliveryID();

    Object sel = jComboBox2.getSelectedItem();
    if (sel == null) {
        JOptionPane.showMessageDialog(this, "Please select a customer.");
        return;
    }
    String selected = sel.toString();

    if (!selected.contains(" - ")) {
        JOptionPane.showMessageDialog(this, "Invalid customer selection.");
        return;
    }

    String[] parts = selected.split(" - ", 2);
    String customerIdStr = parts[0].trim();
    String customerNameFromCombo = parts.length > 1 ? parts[1].trim() : "";

    String customerName = txtCustomerName.getText().trim();
    if (customerName.isEmpty()) {
        customerName = customerNameFromCombo;
    }

    String address = jTextPane3.getText().trim();
    String status = (String) cmbStatus.getSelectedItem();
    String date = txtDate.getText().trim();

    if (customerIdStr.isEmpty()) {
        JOptionPane.showMessageDialog(this, "Please select a customer.");
        return;
    }
    if (customerName.isEmpty()) {
        JOptionPane.showMessageDialog(this, "Customer name cannot be empty.");
        return;
    }
    if (address.isEmpty()) {
        JOptionPane.showMessageDialog(this, "Address cannot be empty.");
        return;
    }
    if (date.isEmpty()) {
        JOptionPane.showMessageDialog(this, "Date cannot be empty.");
        return;
    }

    int customerID;
    try {
        customerID = Integer.parseInt(customerIdStr);
    } catch (NumberFormatException ex) {
        JOptionPane.showMessageDialog(this, "Invalid customer ID.");
        return;
    }

    // INSERT DELIVERY INTO DB
    String sql = "INSERT INTO deliveries (delivery_code, customer_id, customer_name, address, delivery_date, status) "
            + "VALUES (?, ?, ?, ?, ?, ?)";

    try (PreparedStatement pst = con.prepareStatement(sql)) {

        pst.setString(1, deliveryID);
        pst.setInt(2, customerID);
        pst.setString(3, customerName);
        pst.setString(4, address);

        try {
            java.util.Date utilDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(date);
            pst.setDate(5, new java.sql.Date(utilDate.getTime()));
        } catch (Exception ex) {
            pst.setNull(5, java.sql.Types.DATE);
        }

        pst.setString(6, status);
        pst.executeUpdate();

        // -----------------------------------------------------
        // ⭐ INSERT LOG ENTRY
        // -----------------------------------------------------
        String logSql = "INSERT INTO logs (action_type, description, timestamp) VALUES (?, ?, NOW())";
        PreparedStatement logPst = con.prepareStatement(logSql);

        logPst.setString(1, "Delivery Created");
        logPst.setString(2, "Created Delivery #" + deliveryID + " for " + customerName);
        logPst.executeUpdate();

        // -----------------------------------------------------
        // ⭐ Refresh Form1 logs table if it's currently open
        // -----------------------------------------------------
        try {
            Form1Menu.instance.loadLogsTable();
        } catch (Exception ex) {
            // Safe to ignore if Form1 not yet visible
        }

    } catch (SQLException e) {
        JOptionPane.showMessageDialog(this, "Database Error: " + e.getMessage());
        e.printStackTrace();
        return;
    }

    // ADD TO TABLE UI
    model.insertRow(0, new Object[]{
        deliveryID,
        customerID,
        customerName,
        address,
        status,
        date
    });

    jComboBox2.setSelectedIndex(0);
    txtCustomerName.setText("");
    jTextPane3.setText("");
    cmbStatus.setSelectedIndex(0);

    JOptionPane.showMessageDialog(this, "Delivery Added!");
        
        
        
        
        
        
        
        
        
        
        

    }//GEN-LAST:event_jButton1ActionPerformed

    private void btnAddActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnAddActionPerformed
      
          
        
        String name = txtName.getText().trim();
        String phone = txtPhone.getText().trim();
        String address = txtAddress.getText().trim();

        if (name.isEmpty() || phone.isEmpty() || address.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Please fill all fields.");
            return;
        }

        try {
            String sql = "INSERT INTO customers (name, phone, address) VALUES (?, ?, ?)";
            pst = con.prepareStatement(sql, java.sql.Statement.RETURN_GENERATED_KEYS);
            pst.setString(1, name);
            pst.setString(2, phone);
            pst.setString(3, address);

            int affected = pst.executeUpdate();
            if (affected == 0) throw new SQLException("Insert failed, no rows affected.");


            loadCustomers();

            JOptionPane.showMessageDialog(this, "Customer added successfully!");
            
             txtName.setText("");
            txtPhone.setText("");
            txtAddress.setText("");

        } catch (SQLException e) {
            JOptionPane.showMessageDialog(this, "Error adding customer: " + e.getMessage());
            e.printStackTrace();
        }
    }//GEN-LAST:event_btnAddActionPerformed

    private void cmbFilterActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_cmbFilterActionPerformed
       String selected = cmbFilter.getSelectedItem().toString();

    TableRowSorter<DefaultTableModel> sorter =
            (TableRowSorter<DefaultTableModel>) tblDelivery.getRowSorter();

    if (selected.equals("All")) {
        sorter.setRowFilter(null);
    } else {
       sorter.setRowFilter(RowFilter.regexFilter("(?i).*" + selected.trim() + ".*", 4));


 
      
    }
    }//GEN-LAST:event_cmbFilterActionPerformed


    
    public void reloadCustomerComboBox() {
    jComboBox2.removeAllItems();

    jComboBox2.addItem("Customers");  

    for (Customer c : CustomerData.customers) {
        jComboBox2.addItem(c.getId() + " - " + c.getName());
    }

    jComboBox2.setSelectedIndex(0);
}

    
    
    
    
    
    
    
    
    
    
    
    
    
  

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
// Load data into popup table
public void loadCustomersFrom(DefaultTableModel customerModel) {
    DefaultTableModel popupModel = (DefaultTableModel) customerTable.getModel();
    popupModel.setRowCount(0);  // Clear old data

    for (int i = 0; i < customerModel.getRowCount(); i++) {
        Object[] rowData = new Object[customerModel.getColumnCount()];
        for (int j = 0; j < customerModel.getColumnCount(); j++) {
            rowData[j] = customerModel.getValueAt(i, j);
        }
        popupModel.addRow(rowData);
    }
}

 



   public void reloadCustomerTable() {
    DefaultTableModel model = (DefaultTableModel) customerTable.getModel();
    model.setRowCount(0); // clear

    for (Customer c : CustomerData.customers) {
        model.addRow(new Object[]{
            c.getId(),
            c.getName(),
            c.getPhone(),
            c.getAddress()
        });
    }
}


    

public Customer getSelectedCustomer() {
    int row = customerTable.getSelectedRow();
    if (row == -1) return null;

    int id = Integer.parseInt(customerTable.getValueAt(row, 0).toString());
    String name = customerTable.getValueAt(row, 1).toString();
    String phone = customerTable.getValueAt(row, 2).toString();
    String address = customerTable.getValueAt(row, 3).toString();

    return new Customer(id, name, phone, address);
}


private void setupSearch() {
    TableRowSorter<DefaultTableModel> sorter =
        new TableRowSorter<>((DefaultTableModel) customerTable.getModel());
    customerTable.setRowSorter(sorter);

    jTextField1.getDocument().addDocumentListener(new javax.swing.event.DocumentListener() {
        @Override
        public void insertUpdate(javax.swing.event.DocumentEvent e) { filter(); }
        @Override
        public void removeUpdate(javax.swing.event.DocumentEvent e) { filter(); }
        @Override
        public void changedUpdate(javax.swing.event.DocumentEvent e) {}

        private void filter() {
            String text = jTextField1.getText();

            if (text.equals("Search...") || text.trim().isEmpty()) {
                sorter.setRowFilter(null);
                return;
            }

         sorter.setRowFilter(RowFilter.regexFilter("(?i)^" + text));

        }
    });
}





private void setupPlaceholder() {
    jTextField1.setForeground(Color.GRAY);

    jTextField1.addFocusListener(new java.awt.event.FocusAdapter() {
        @Override
        public void focusGained(java.awt.event.FocusEvent e) {
            if (jTextField1.getText().equals("Search...")) {
                jTextField1.setText("");
                jTextField1.setForeground(Color.BLACK);
            }
        }

        @Override
        public void focusLost(java.awt.event.FocusEvent e) {
            if (jTextField1.getText().trim().isEmpty()) {
                jTextField1.setText("Search...");
                jTextField1.setForeground(Color.GRAY);
            }
        }
    });
}

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton btnAdd;
    private javax.swing.JButton btnPopup;
    private javax.swing.JComboBox<String> cmbFilter;
    private javax.swing.JComboBox<String> cmbStatus;
    private javax.swing.JTable customerTable;
    private javax.swing.JButton jButton1;
    private javax.swing.JComboBox<String> jComboBox2;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel10;
    private javax.swing.JLabel jLabel11;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JLabel jLabel5;
    private javax.swing.JLabel jLabel6;
    private javax.swing.JLabel jLabel7;
    private javax.swing.JLabel jLabel8;
    private javax.swing.JLabel jLabel9;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JPanel jPanel2;
    private javax.swing.JPanel jPanel3;
    private javax.swing.JPanel jPanel4;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JScrollPane jScrollPane2;
    private javax.swing.JTextField jTextField1;
    private javax.swing.JTextField jTextPane3;
    private javax.swing.JTabbedPane tabManagement;
    private javax.swing.JTable tblDelivery;
    private javax.swing.JTextField txtAddress;
    private javax.swing.JTextField txtCustomerName;
    private javax.swing.JTextField txtDate;
    private javax.swing.JTextField txtName;
    private javax.swing.JTextField txtPhone;
    // End of variables declaration//GEN-END:variables
}
