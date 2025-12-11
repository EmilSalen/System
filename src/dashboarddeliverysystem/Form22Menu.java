
package dashboarddeliverysystem;

import java.awt.Color;
import java.awt.Window;
import javax.swing.JDialog;
import javax.swing.RowFilter;
import javax.swing.SwingUtilities;
import javax.swing.table.DefaultTableModel;
import javax.swing.table.TableRowSorter;


public class Form22Menu extends javax.swing.JPanel {

   
    
    
    public Form22Menu() {
        initComponents();
         setupPlaceholder(); 
         setupSearch();
         
         
         
    }

    
// Load data into popup table
public void loadCustomersFrom(DefaultTableModel customerModel) {
    DefaultTableModel popupModel = (DefaultTableModel) tblPopup.getModel();
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
    DefaultTableModel model = (DefaultTableModel) tblPopup.getModel();
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
    int row = tblPopup.getSelectedRow();
    if (row == -1) return null;

    int id = Integer.parseInt(tblPopup.getValueAt(row, 0).toString());
    String name = tblPopup.getValueAt(row, 1).toString();
    String phone = tblPopup.getValueAt(row, 2).toString();
    String address = tblPopup.getValueAt(row, 3).toString();

    return new Customer(id, name, phone, address);
}


private void setupSearch() {
    TableRowSorter<DefaultTableModel> sorter =
        new TableRowSorter<>((DefaultTableModel) tblPopup.getModel());
    tblPopup.setRowSorter(sorter);

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


    
    
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jScrollPane1 = new javax.swing.JScrollPane();
        tblPopup = new javax.swing.JTable();
        jTextField1 = new javax.swing.JTextField();
        jLabel2 = new javax.swing.JLabel();
        jButton1 = new javax.swing.JButton();

        setBackground(new java.awt.Color(255, 255, 255));

        tblPopup.setBorder(javax.swing.BorderFactory.createBevelBorder(javax.swing.border.BevelBorder.RAISED));
        tblPopup.setModel(new javax.swing.table.DefaultTableModel(
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
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null}
            },
            new String [] {
                "Customer ID.", "Customer Name", "Phone no.", "Address"
            }
        ));
        tblPopup.setShowGrid(true);
        tblPopup.setSurrendersFocusOnKeystroke(true);
        jScrollPane1.setViewportView(tblPopup);

        jTextField1.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jTextField1ActionPerformed(evt);
            }
        });

        jLabel2.setForeground(new java.awt.Color(0, 0, 0));
        jLabel2.setText("Search");

        jButton1.setText("Ok");
        jButton1.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton1ActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(this);
        this.setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addComponent(jButton1)
                    .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                        .addGroup(layout.createSequentialGroup()
                            .addGap(51, 51, 51)
                            .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 848, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGroup(layout.createSequentialGroup()
                            .addGap(92, 92, 92)
                            .addComponent(jLabel2)
                            .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                            .addComponent(jTextField1, javax.swing.GroupLayout.PREFERRED_SIZE, 328, javax.swing.GroupLayout.PREFERRED_SIZE))))
                .addContainerGap(60, Short.MAX_VALUE))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addContainerGap(46, Short.MAX_VALUE)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jTextField1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabel2))
                .addGap(76, 76, 76)
                .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 345, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(26, 26, 26)
                .addComponent(jButton1)
                .addGap(32, 32, 32))
        );
    }// </editor-fold>//GEN-END:initComponents

    private void jButton1ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton1ActionPerformed
         Window window = SwingUtilities.getWindowAncestor(this);
    if (window instanceof JDialog) {
        ((JDialog) window).dispose();   // Close popup
    }
    }//GEN-LAST:event_jButton1ActionPerformed

    private void jTextField1ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jTextField1ActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_jTextField1ActionPerformed


    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton jButton1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JTextField jTextField1;
    private javax.swing.JTable tblPopup;
    // End of variables declaration//GEN-END:variables
}
