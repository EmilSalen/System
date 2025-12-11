
package dashboarddeliverysystem;


import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import javax.swing.border.*;



public class Form5Menu extends javax.swing.JPanel {


public Form5Menu() {
    initComponents();  


    chkDarkMode.setSelected(dashBoard.ThemeManager.darkMode);
    chkDarkMode.setOpaque(false);


    setBackground(dashBoard.ThemeManager.bg());
    
    
    System.out.println("Form5Menu Loaded");

}
        
        
       
    
    
   
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        chkDarkMode = new javax.swing.JCheckBox();
        jLabel1 = new javax.swing.JLabel();

        setBackground(new java.awt.Color(255, 255, 255));

        chkDarkMode.setForeground(new java.awt.Color(0, 0, 0));
        chkDarkMode.setText("Dark Mode");
        chkDarkMode.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                chkDarkModeActionPerformed(evt);
            }
        });

        jLabel1.setFont(new java.awt.Font("Segoe UI", 1, 36)); // NOI18N
        jLabel1.setForeground(new java.awt.Color(0, 0, 0));
        jLabel1.setText("jLabel1");

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(this);
        this.setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addGap(99, 99, 99)
                        .addComponent(chkDarkMode, javax.swing.GroupLayout.PREFERRED_SIZE, 140, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addGroup(layout.createSequentialGroup()
                        .addGap(354, 354, 354)
                        .addComponent(jLabel1)))
                .addContainerGap(380, Short.MAX_VALUE))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGap(90, 90, 90)
                .addComponent(jLabel1)
                .addGap(133, 133, 133)
                .addComponent(chkDarkMode, javax.swing.GroupLayout.PREFERRED_SIZE, 43, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(241, Short.MAX_VALUE))
        );
    }// </editor-fold>//GEN-END:initComponents

    private void chkDarkModeActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_chkDarkModeActionPerformed
    
    }//GEN-LAST:event_chkDarkModeActionPerformed

   
    
            
    
    

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JCheckBox chkDarkMode;
    private javax.swing.JLabel jLabel1;
    // End of variables declaration//GEN-END:variables
}
