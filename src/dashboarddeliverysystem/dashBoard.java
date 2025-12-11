package dashboarddeliverysystem;
// DAMN
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.BorderFactory;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JLayeredPane;
import javax.swing.SwingUtilities;


public class dashBoard extends javax.swing.JFrame {

    public static class ThemeManager {
        public static boolean darkMode = false;

        public static Color bg() {
            return darkMode ? new Color(32, 32, 32) : Color.WHITE;
        }

        public static Color text() {
            return darkMode ? Color.WHITE : Color.BLACK;
        }

        public static Color sidebar() {
            return darkMode ? new Color(24, 24, 24) : new Color(245, 245, 245);
        }
    }

    private static final java.util.logging.Logger logger = java.util.logging.Logger.getLogger(dashBoard.class.getName());
    private JPanel selectedPanel = null;

    private final Color DefaultColor = new Color(25, 25, 25);   // panel 
    private final Color HoverColor   = new Color(102, 51, 0);   // hover
    private final Color ClickedColor = new Color(204, 102, 0);  // clicked

    private boolean sidebarOpen = false;
    private final int SIDEBAR_WIDTH = 210;

    



    
    
    
    public dashBoard() {
        initComponents();
    
        jPanel5.setVisible(false);
        getContentPane().remove(jPanel5);


        Color TopBarColor = new Color(204, 102, 0);

        
        panelSlider.setPreferredSize(new Dimension(180, getHeight()));
        panelSlider.setMaximumSize(new Dimension(180, Integer.MAX_VALUE));
        panelSlider.setMinimumSize(new Dimension(180, 0));

        attachSidebarCloseEvents();

        
        

        
      
    
        FormPanel.setBorder(BorderFactory.createMatteBorder(0, 0, 1, 0, new Color(150, 75, 0)));

        lbl1.setFocusable(false);
        lbl1.setOpaque(false);
        lbl2.setOpaque(false);
        lbl3.setOpaque(false);
        lbl4.setOpaque(false);
        lbl5.setOpaque(false);
        lblX.setOpaque(true);
        lblMin.setOpaque(true);

        lbl1.setBackground(DefaultColor);
        lbl2.setBackground(DefaultColor);
        lbl3.setBackground(DefaultColor);
        lbl4.setBackground(DefaultColor);
        lbl5.setBackground(DefaultColor);
        lblX.setBackground(TopBarColor);
        lblMin.setBackground(TopBarColor);

        addMenuEffects(Menu1, lbl1);
        addMenuEffects(Menu2, lbl2);
        addMenuEffects(Menu3, lbl3);
        addMenuEffects(Menu4, lbl4);
        addMenuEffects(Menu5, lbl5);


        lbl1.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mousePressed(java.awt.event.MouseEvent evt) { Menu1MousePressed(evt); }
        });
        lbl2.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mousePressed(java.awt.event.MouseEvent evt) { Menu2MousePressed(evt); }
        });
        lbl3.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mousePressed(java.awt.event.MouseEvent evt) { Menu3MousePressed(evt); }
        });
        lbl4.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mousePressed(java.awt.event.MouseEvent evt) { Menu4MousePressed(evt); }
        });
        lblX.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mousePressed(java.awt.event.MouseEvent evt) { Menu5MousePressed(evt); }
        });
      lbl5.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mousePressed(java.awt.event.MouseEvent evt) { Menu5MousePressed(evt); }
        });
       
      
      
      
      
   
      
      
      
      
        
        
        
    
        getContentPane().removeAll();
        getContentPane().setLayout(new java.awt.BorderLayout(0, 0));
        jPanel4.setBorder(null);
        jPanel5.setBorder(null);
        FormPanel.setBorder(null);
        getContentPane().add(jPanel4, java.awt.BorderLayout.NORTH);
    
        getContentPane().add(FormPanel, java.awt.BorderLayout.CENTER);
        revalidate();
        repaint();


        lbl1.addMouseListener(new java.awt.event.MouseAdapter() {
            @Override public void mouseClicked(java.awt.event.MouseEvent evt) { Menu1MouseClicked(evt); }
        });
        lbl2.addMouseListener(new java.awt.event.MouseAdapter() {
            @Override public void mouseClicked(java.awt.event.MouseEvent evt) { Menu2MouseClicked(evt); }
        });
        lbl3.addMouseListener(new java.awt.event.MouseAdapter() {
            @Override public void mouseClicked(java.awt.event.MouseEvent evt) { Menu3MouseClicked(evt); }
        });
        lbl4.addMouseListener(new java.awt.event.MouseAdapter() {
            @Override public void mouseClicked(java.awt.event.MouseEvent evt) { Menu4MouseClicked(evt); }
        });
        lbl5.addMouseListener(new java.awt.event.MouseAdapter() {
            @Override public void mouseClicked(java.awt.event.MouseEvent evt) { Menu5MouseClicked(evt); }
        });
    
        
        java.awt.Cursor handCursor = new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR);
        lbl1.setCursor(handCursor);
        lbl2.setCursor(handCursor);
        lbl3.setCursor(handCursor);
        lbl4.setCursor(handCursor);
        lbl5.setCursor(handCursor);
    
        

        
        
lblX.addMouseListener(new MouseAdapter() {
    @Override
    public void mouseClicked(MouseEvent e) {
        System.exit(0);
    }
});

lblMin.addMouseListener(new MouseAdapter() {
    @Override
    public void mouseClicked(MouseEvent e) {
        setState(JFrame.ICONIFIED);
    }
});

lbl5.addMouseListener(new MouseAdapter() {
    @Override
    public void mouseClicked(MouseEvent e) {
        Menu5MouseClicked(e);
    }
});

        
   



        
        











        
        new javax.swing.Timer(100, e -> {
    
        }).start();


        Form1Menu form = new Form1Menu();
        form.setSize(FormPanel.getSize());
        form.setLocation(0, 0);
        FormPanel.removeAll();
        FormPanel.setLayout(new java.awt.BorderLayout());
        FormPanel.add(form, java.awt.BorderLayout.CENTER);
        FormPanel.revalidate();
        FormPanel.repaint();

     
        SwingUtilities.invokeLater(this::setupOverlaySidebar);
    }


    
    
    

    
    
    
    
    
    private void attachSidebarCloseEvents() {
    JPanel[] menus = { Menu1, Menu2, Menu3, Menu4, Menu5 };
    JLabel[] labels = { lbl1, lbl2, lbl3, lbl4, lbl5 };

    MouseAdapter closeListener = new MouseAdapter() {
        @Override
        public void mouseClicked(MouseEvent e) {
            closeSidebar();
        }
    };

    for (JPanel m : menus) m.addMouseListener(closeListener);
    for (JLabel l : labels) l.addMouseListener(closeListener);
}

    
    
    
    
    
    
    
    
    private void setupOverlaySidebar() {
    // ensure panelSlider is not still inside some other container (remove it)
    if (panelSlider.getParent() != null) {
        panelSlider.getParent().remove(panelSlider);
    }

    // run after layout/pack so sizes/heights are valid
    SwingUtilities.invokeLater(() -> {
        JLayeredPane layered = getLayeredPane();

        // compute top bar Y so sidebar sits under jPanel4
        int topBarHeight = jPanel4.getHeight();
        int frameHeight = getHeight();
        int sidebarHeight = Math.max(200, frameHeight - topBarHeight);

        // start off-screen to the left
        panelSlider.setBounds(-SIDEBAR_WIDTH, topBarHeight, SIDEBAR_WIDTH, sidebarHeight);

        // make sure the panel is opaque and has background (so it's visible)
        panelSlider.setOpaque(true);
        // optional: panelSlider.setBackground(new Color(25,25,25));

        // add to layered pane (remove first if already present)
        layered.remove(panelSlider);
        layered.add(panelSlider, JLayeredPane.PALETTE_LAYER);
        layered.moveToFront(panelSlider);

        panelSlider.setVisible(true);
        panelSlider.revalidate();
        panelSlider.repaint();

        // toggle when MenuName clicked
        MenuName.setCursor(java.awt.Cursor.getPredefinedCursor(java.awt.Cursor.HAND_CURSOR));
        MenuName.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                toggleOverlaySidebar();
            }
        });

        // click outside to close (optional): clicking anywhere on content area hides sidebar
        getLayeredPane().addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                // if sidebar is open and click is outside it, hide it
                if (sidebarOpen && e.getX() > panelSlider.getX() + panelSlider.getWidth()) {
                    toggleOverlaySidebar();
                }
            }
        });
    });
}

private void toggleOverlaySidebar() {
    // toggle between fully hidden (-SIDEBAR_WIDTH) and visible 0
    if (sidebarOpen) {
        slideOut(panelSlider, -SIDEBAR_WIDTH);
    } else {
        // ensure it's in front and visible before animating
        JLayeredPane layered = getLayeredPane();
        layered.moveToFront(panelSlider);
        panelSlider.setVisible(true);
        slideOut(panelSlider, 0);
    }
    sidebarOpen = !sidebarOpen;
}

private void slideOut(JPanel panel, int targetX) {
    // simple animated ease in/out slide (keeps previous behavior)
    final int startX = panel.getX();
    final int distance = targetX - startX;
    final int steps = 30;
    final int delay = 8;
    final int[] step = {0};

    javax.swing.Timer timer = new javax.swing.Timer(delay, null);
    timer.addActionListener(ae -> {
        step[0]++;
        double fraction = (double) step[0] / steps;
        double ease = (1 - Math.cos(Math.PI * fraction)) / 2.0;
        int nextX = startX + (int) Math.round(distance * ease);
        panel.setLocation(nextX, panel.getY());
        panel.revalidate();
        panel.repaint();

        if (step[0] >= steps) {
            ((javax.swing.Timer) ae.getSource()).stop();
            panel.setLocation(targetX, panel.getY());

            // if hidden, optionally set invisible to avoid clicks through
            if (targetX < 0) {
                panel.setVisible(false);
            } else {
                panel.setVisible(true);
            }
        }
    });
    timer.start();
}

    
    
    
   
   

   
   
   
    
    
      private void addMenuEffects(JPanel panel, JLabel label) {
        MouseAdapter hoverEffect = new MouseAdapter() {
            @Override
            public void mouseEntered(MouseEvent e) {
                if (panel != selectedPanel) {
                    panel.setBackground(HoverColor);
                    label.setForeground(Color.YELLOW);
                }
            }

            @Override
            public void mouseExited(MouseEvent e) {
                if (panel != selectedPanel) {
                    panel.setBackground(DefaultColor);
                    label.setForeground(Color.WHITE);
                }
            }

            @Override
            public void mousePressed(MouseEvent e) {
                resetMenuColors();
                selectedPanel = panel;
                panel.setBackground(ClickedColor);
                label.setForeground(Color.WHITE);
            }
        };

        panel.addMouseListener(hoverEffect);
        label.addMouseListener(hoverEffect);
    }

    private void resetMenuColors() {
        javax.swing.JPanel[] panels = {Menu1, Menu2, Menu3, Menu4, Menu5};
        javax.swing.JLabel[] labels = {lbl1, lbl2, lbl3, lbl4, lbl5, lblX, lblMin};
        for (int i = 0; i < panels.length; i++) {
            panels[i].setBackground(DefaultColor);
            labels[i].setForeground(Color.WHITE);
        }
    }

    private void animateColor(JPanel panel, Color start, Color end, int steps, int duration) {
        new javax.swing.Timer(duration / steps, new java.awt.event.ActionListener() {
            int count = 0;
            public void actionPerformed(java.awt.event.ActionEvent e) {
                float ratio = (float) count / (float) steps;
                int r = (int)(start.getRed() + ratio * (end.getRed() - start.getRed()));
                int g = (int)(start.getGreen() + ratio * (end.getGreen() - start.getGreen()));
                int b = (int)(start.getBlue() + ratio * (end.getBlue() - start.getBlue()));
                panel.setBackground(new Color(r, g, b));
                count++;
                if (count > steps) ((javax.swing.Timer)e.getSource()).stop();
            }
        }).start();
    }

    class RoundedPanel extends JPanel {
        private int cornerRadius;
        private Color backgroundColor;

        public RoundedPanel(int radius, Color bgColor) {
            super();
            cornerRadius = radius;
            backgroundColor = bgColor;
            setOpaque(false);
        }

        @Override
        protected void paintComponent(Graphics g) {
            super.paintComponent(g);
            Dimension arcs = new Dimension(cornerRadius, cornerRadius);
            Graphics2D g2 = (Graphics2D) g;
            g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
            g2.setColor(backgroundColor);
            g2.fillRoundRect(0, 0, getWidth()-1, getHeight()-1, arcs.width, arcs.height);
        }
    }

    private void slidePanel(JPanel newPanel) {
        newPanel.setSize(FormPanel.getSize());
        newPanel.setLocation(FormPanel.getWidth(), 0);
        FormPanel.add(newPanel);

        new javax.swing.Timer(10, new java.awt.event.ActionListener() {
            int x = FormPanel.getWidth();
            public void actionPerformed(java.awt.event.ActionEvent e) {
                x -= 20;
                newPanel.setLocation(x, 0);
                if (x <= 0) {
                    ((javax.swing.Timer)e.getSource()).stop();
                    FormPanel.removeAll();
                    FormPanel.add(newPanel);
                    FormPanel.revalidate();
                    FormPanel.repaint();
                }
            }
        }).start();
    }

    public void toggleDarkMode() {
        ThemeManager.darkMode = !ThemeManager.darkMode;
        refreshTheme();
    }

    public void refreshTheme() {
        getContentPane().setBackground(ThemeManager.bg());
        repaint();
    }
    
    
    
    
private void closeSidebar() {
    if (sidebarOpen) { 
        toggleOverlaySidebar();
    }
}


    
    
    
    
    
    
    
   



    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jLabel4 = new javax.swing.JLabel();
        border1 = new SoftBorder.Border();
        jPanel5 = new javax.swing.JPanel();
        FormPanel = new javax.swing.JPanel();
        jPanel4 = new javax.swing.JPanel();
        lblX = new javax.swing.JLabel();
        jLabel3 = new javax.swing.JLabel();
        jLabel2 = new javax.swing.JLabel();
        MenuName = new javax.swing.JLabel();
        lblMin = new javax.swing.JLabel();
        panelSlider = new javax.swing.JPanel();
        Menu1 = new javax.swing.JPanel();
        lbl1 = new javax.swing.JLabel();
        Menu4 = new javax.swing.JPanel();
        lbl4 = new javax.swing.JLabel();
        Menu2 = new javax.swing.JPanel();
        lbl2 = new javax.swing.JLabel();
        Menu3 = new javax.swing.JPanel();
        lbl3 = new javax.swing.JLabel();
        Menu5 = new javax.swing.JPanel();
        lbl5 = new javax.swing.JLabel();

        jLabel4.setText("jLabel4");

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setBackground(new java.awt.Color(255, 255, 255));
        setUndecorated(true);

        border1.setBackground(new java.awt.Color(255, 255, 255));

        jPanel5.setBackground(new java.awt.Color(255, 255, 255));

        FormPanel.setBackground(new java.awt.Color(204, 204, 204));
        FormPanel.setBorder(javax.swing.BorderFactory.createBevelBorder(javax.swing.border.BevelBorder.RAISED));
        FormPanel.setPreferredSize(new java.awt.Dimension(959, 570));
        FormPanel.setRequestFocusEnabled(false);

        javax.swing.GroupLayout FormPanelLayout = new javax.swing.GroupLayout(FormPanel);
        FormPanel.setLayout(FormPanelLayout);
        FormPanelLayout.setHorizontalGroup(
            FormPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 1027, Short.MAX_VALUE)
        );
        FormPanelLayout.setVerticalGroup(
            FormPanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 0, Short.MAX_VALUE)
        );

        jPanel4.setBackground(new java.awt.Color(204, 102, 0));

        lblX.setIcon(new javax.swing.ImageIcon(getClass().getResource("/icons/icons8-x-30-2.png"))); // NOI18N
        lblX.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                lblXMouseClicked(evt);
            }
            public void mousePressed(java.awt.event.MouseEvent evt) {
                lblXMousePressed(evt);
            }
        });

        jLabel3.setFont(new java.awt.Font("Segoe UI", 1, 24)); // NOI18N
        jLabel3.setForeground(new java.awt.Color(255, 255, 255));
        jLabel3.setText("Delivery Management System");

        jLabel2.setIcon(new javax.swing.ImageIcon(getClass().getResource("/icons/icons8-delivery-50_1.png"))); // NOI18N
        jLabel2.setText("jLabel2");

        MenuName.setBackground(new java.awt.Color(255, 255, 255));
        MenuName.setFont(new java.awt.Font("Segoe UI", 1, 24)); // NOI18N
        MenuName.setIcon(new javax.swing.ImageIcon(getClass().getResource("/icons/icons8-menu-35.png"))); // NOI18N

        lblMin.setIcon(new javax.swing.ImageIcon(getClass().getResource("/icons/icons8-minimize-32.png"))); // NOI18N
        lblMin.setText("jLabel5");
        lblMin.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                lblMinMouseClicked(evt);
            }
        });

        javax.swing.GroupLayout jPanel4Layout = new javax.swing.GroupLayout(jPanel4);
        jPanel4.setLayout(jPanel4Layout);
        jPanel4Layout.setHorizontalGroup(
            jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel4Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(MenuName)
                .addGap(117, 117, 117)
                .addComponent(jLabel2, javax.swing.GroupLayout.PREFERRED_SIZE, 57, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jLabel3, javax.swing.GroupLayout.PREFERRED_SIZE, 346, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(lblMin, javax.swing.GroupLayout.PREFERRED_SIZE, 37, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(lblX)
                .addGap(21, 21, 21))
        );
        jPanel4Layout.setVerticalGroup(
            jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel4Layout.createSequentialGroup()
                .addGroup(jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel4Layout.createSequentialGroup()
                        .addContainerGap()
                        .addGroup(jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                            .addGroup(jPanel4Layout.createSequentialGroup()
                                .addComponent(MenuName)
                                .addGap(1, 1, 1))
                            .addGroup(jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                .addComponent(jLabel2)
                                .addComponent(jLabel3)
                                .addComponent(lblMin))))
                    .addGroup(jPanel4Layout.createSequentialGroup()
                        .addGap(16, 16, 16)
                        .addComponent(lblX)))
                .addContainerGap())
        );

        panelSlider.setBackground(new java.awt.Color(25, 25, 25));

        Menu1.setBackground(new java.awt.Color(25, 25, 25));
        Menu1.setPreferredSize(new java.awt.Dimension(162, 62));
        Menu1.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                Menu1MouseClicked(evt);
            }
            public void mousePressed(java.awt.event.MouseEvent evt) {
                Menu1MousePressed(evt);
            }
        });

        lbl1.setBackground(new java.awt.Color(0, 0, 0));
        lbl1.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        lbl1.setForeground(new java.awt.Color(255, 255, 255));
        lbl1.setIcon(new javax.swing.ImageIcon(getClass().getResource("/icons/icons8-home-50.png"))); // NOI18N
        lbl1.setText("Home");
        lbl1.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mousePressed(java.awt.event.MouseEvent evt) {
                lbl1MousePressed(evt);
            }
        });

        javax.swing.GroupLayout Menu1Layout = new javax.swing.GroupLayout(Menu1);
        Menu1.setLayout(Menu1Layout);
        Menu1Layout.setHorizontalGroup(
            Menu1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(Menu1Layout.createSequentialGroup()
                .addGap(36, 36, 36)
                .addComponent(lbl1, javax.swing.GroupLayout.PREFERRED_SIZE, 122, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
        Menu1Layout.setVerticalGroup(
            Menu1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(Menu1Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(lbl1, javax.swing.GroupLayout.PREFERRED_SIZE, 56, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(11, Short.MAX_VALUE))
        );

        Menu4.setBackground(new java.awt.Color(25, 25, 25));
        Menu4.setPreferredSize(new java.awt.Dimension(169, 62));
        Menu4.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                Menu4MouseClicked(evt);
            }
            public void mousePressed(java.awt.event.MouseEvent evt) {
                Menu4MousePressed(evt);
            }
        });

        lbl4.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        lbl4.setForeground(new java.awt.Color(255, 255, 255));
        lbl4.setIcon(new javax.swing.ImageIcon(getClass().getResource("/icons/icons8-history-50.png"))); // NOI18N
        lbl4.setText("History");

        javax.swing.GroupLayout Menu4Layout = new javax.swing.GroupLayout(Menu4);
        Menu4.setLayout(Menu4Layout);
        Menu4Layout.setHorizontalGroup(
            Menu4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(Menu4Layout.createSequentialGroup()
                .addGap(35, 35, 35)
                .addComponent(lbl4, javax.swing.GroupLayout.PREFERRED_SIZE, 131, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
        Menu4Layout.setVerticalGroup(
            Menu4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, Menu4Layout.createSequentialGroup()
                .addContainerGap(12, Short.MAX_VALUE)
                .addComponent(lbl4, javax.swing.GroupLayout.PREFERRED_SIZE, 55, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap())
        );

        Menu2.setBackground(new java.awt.Color(25, 25, 25));
        Menu2.setPreferredSize(new java.awt.Dimension(169, 62));
        Menu2.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                Menu2MouseClicked(evt);
            }
            public void mousePressed(java.awt.event.MouseEvent evt) {
                Menu2MousePressed(evt);
            }
        });

        lbl2.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        lbl2.setForeground(new java.awt.Color(255, 255, 255));
        lbl2.setIcon(new javax.swing.ImageIcon(getClass().getResource("/icons/icons8-management-50_1.png"))); // NOI18N
        lbl2.setText("Management");

        javax.swing.GroupLayout Menu2Layout = new javax.swing.GroupLayout(Menu2);
        Menu2.setLayout(Menu2Layout);
        Menu2Layout.setHorizontalGroup(
            Menu2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(Menu2Layout.createSequentialGroup()
                .addGap(14, 14, 14)
                .addComponent(lbl2)
                .addContainerGap(22, Short.MAX_VALUE))
        );
        Menu2Layout.setVerticalGroup(
            Menu2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(Menu2Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(lbl2, javax.swing.GroupLayout.PREFERRED_SIZE, 59, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(9, Short.MAX_VALUE))
        );

        Menu3.setBackground(new java.awt.Color(25, 25, 25));
        Menu3.setPreferredSize(new java.awt.Dimension(169, 62));
        Menu3.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                Menu3MouseClicked(evt);
            }
            public void mousePressed(java.awt.event.MouseEvent evt) {
                Menu3MousePressed(evt);
            }
        });

        lbl3.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        lbl3.setForeground(new java.awt.Color(255, 255, 255));
        lbl3.setIcon(new javax.swing.ImageIcon(getClass().getResource("/icons/icons8-analytics-50.png"))); // NOI18N
        lbl3.setText("Reports");

        javax.swing.GroupLayout Menu3Layout = new javax.swing.GroupLayout(Menu3);
        Menu3.setLayout(Menu3Layout);
        Menu3Layout.setHorizontalGroup(
            Menu3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(Menu3Layout.createSequentialGroup()
                .addGap(36, 36, 36)
                .addComponent(lbl3, javax.swing.GroupLayout.PREFERRED_SIZE, 139, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
        Menu3Layout.setVerticalGroup(
            Menu3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, Menu3Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(lbl3, javax.swing.GroupLayout.DEFAULT_SIZE, 62, Short.MAX_VALUE)
                .addContainerGap())
        );

        Menu5.setBackground(new java.awt.Color(25, 25, 25));
        Menu5.setPreferredSize(new java.awt.Dimension(169, 62));
        Menu5.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                Menu5MouseClicked(evt);
            }
            public void mousePressed(java.awt.event.MouseEvent evt) {
                Menu5MousePressed(evt);
            }
        });

        lbl5.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        lbl5.setForeground(new java.awt.Color(255, 255, 255));
        lbl5.setIcon(new javax.swing.ImageIcon(getClass().getResource("/icons/icons8-settings-64.png"))); // NOI18N
        lbl5.setText("Settings");

        javax.swing.GroupLayout Menu5Layout = new javax.swing.GroupLayout(Menu5);
        Menu5.setLayout(Menu5Layout);
        Menu5Layout.setHorizontalGroup(
            Menu5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(Menu5Layout.createSequentialGroup()
                .addGap(19, 19, 19)
                .addComponent(lbl5, javax.swing.GroupLayout.PREFERRED_SIZE, 160, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
        Menu5Layout.setVerticalGroup(
            Menu5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(Menu5Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(lbl5)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );

        javax.swing.GroupLayout panelSliderLayout = new javax.swing.GroupLayout(panelSlider);
        panelSlider.setLayout(panelSliderLayout);
        panelSliderLayout.setHorizontalGroup(
            panelSliderLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(Menu1, javax.swing.GroupLayout.DEFAULT_SIZE, 204, Short.MAX_VALUE)
            .addComponent(Menu2, javax.swing.GroupLayout.DEFAULT_SIZE, 204, Short.MAX_VALUE)
            .addComponent(Menu3, javax.swing.GroupLayout.DEFAULT_SIZE, 204, Short.MAX_VALUE)
            .addComponent(Menu5, javax.swing.GroupLayout.DEFAULT_SIZE, 204, Short.MAX_VALUE)
            .addComponent(Menu4, javax.swing.GroupLayout.DEFAULT_SIZE, 204, Short.MAX_VALUE)
        );
        panelSliderLayout.setVerticalGroup(
            panelSliderLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(panelSliderLayout.createSequentialGroup()
                .addGap(50, 50, 50)
                .addComponent(Menu1, javax.swing.GroupLayout.PREFERRED_SIZE, 73, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(50, 50, 50)
                .addComponent(Menu2, javax.swing.GroupLayout.PREFERRED_SIZE, 74, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(Menu3, javax.swing.GroupLayout.PREFERRED_SIZE, 74, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(50, 50, 50)
                .addComponent(Menu4, javax.swing.GroupLayout.PREFERRED_SIZE, 73, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(50, 50, 50)
                .addComponent(Menu5, javax.swing.GroupLayout.PREFERRED_SIZE, 74, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(51, 51, 51))
        );

        javax.swing.GroupLayout jPanel5Layout = new javax.swing.GroupLayout(jPanel5);
        jPanel5.setLayout(jPanel5Layout);
        jPanel5Layout.setHorizontalGroup(
            jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel5Layout.createSequentialGroup()
                .addGap(0, 0, Short.MAX_VALUE)
                .addGroup(jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING, false)
                    .addComponent(jPanel4, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addGroup(jPanel5Layout.createSequentialGroup()
                        .addComponent(panelSlider, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(FormPanel, javax.swing.GroupLayout.PREFERRED_SIZE, 1031, javax.swing.GroupLayout.PREFERRED_SIZE)))
                .addContainerGap())
        );
        jPanel5Layout.setVerticalGroup(
            jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel5Layout.createSequentialGroup()
                .addComponent(jPanel4, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addComponent(FormPanel, javax.swing.GroupLayout.DEFAULT_SIZE, 625, Short.MAX_VALUE)
                    .addComponent(panelSlider, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addGap(0, 0, Short.MAX_VALUE))
        );

        javax.swing.GroupLayout border1Layout = new javax.swing.GroupLayout(border1);
        border1.setLayout(border1Layout);
        border1Layout.setHorizontalGroup(
            border1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(border1Layout.createSequentialGroup()
                .addComponent(jPanel5, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(0, 0, Short.MAX_VALUE))
        );
        border1Layout.setVerticalGroup(
            border1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jPanel5, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );

        getContentPane().add(border1, java.awt.BorderLayout.PAGE_START);

        pack();
        setLocationRelativeTo(null);
    }// </editor-fold>//GEN-END:initComponents

    private void lblXMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_lblXMouseClicked
        this.dispose();
    }//GEN-LAST:event_lblXMouseClicked

    private void Menu1MousePressed(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_Menu1MousePressed
        lbl1.setBackground(ClickedColor);
        lbl2.setBackground(DefaultColor);
        lbl3.setBackground(DefaultColor);
        lbl4.setBackground(DefaultColor);
        lbl5.setBackground(DefaultColor);
        
        MenuName.setText("Home");
    }//GEN-LAST:event_Menu1MousePressed

    private void Menu2MousePressed(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_Menu2MousePressed
        lbl1.setBackground(DefaultColor);
        lbl2.setBackground(ClickedColor);
        lbl3.setBackground(DefaultColor);
        lbl4.setBackground(DefaultColor);
        lbl5.setBackground(DefaultColor);
        
         MenuName.setText("Management");
    }//GEN-LAST:event_Menu2MousePressed

    private void Menu3MousePressed(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_Menu3MousePressed
        lbl1.setBackground(DefaultColor);
        lbl2.setBackground(DefaultColor);
        lbl3.setBackground(ClickedColor);
        lbl4.setBackground(DefaultColor);
        lbl5.setBackground(DefaultColor);
        
         MenuName.setText("Reports");
    }//GEN-LAST:event_Menu3MousePressed

    private void Menu4MousePressed(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_Menu4MousePressed
         lbl1.setBackground(DefaultColor);
        lbl2.setBackground(DefaultColor);
        lbl3.setBackground(ClickedColor);
        lbl4.setBackground(ClickedColor);
        lbl5.setBackground(DefaultColor);
        
         MenuName.setText("History");
    }//GEN-LAST:event_Menu4MousePressed

    private void Menu5MousePressed(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_Menu5MousePressed
     
    lbl1.setBackground(DefaultColor);   
    lbl2.setBackground(DefaultColor);
    lbl3.setBackground(ClickedColor);
    lbl4.setBackground(DefaultColor);
    lbl5.setBackground(ClickedColor);

    MenuName.setText("Settings");


    Form5Menu form = new Form5Menu();

    FormPanel.removeAll();
    FormPanel.setLayout(new java.awt.BorderLayout());           
    FormPanel.add(form, java.awt.BorderLayout.CENTER);          
    FormPanel.revalidate();
    FormPanel.repaint();

    System.out.println("Settings clicked -> Form5Menu added to FormPanel");
    }//GEN-LAST:event_Menu5MousePressed

    private void lbl1MousePressed(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_lbl1MousePressed
       lbl1.setBackground(ClickedColor);
        lbl2.setBackground(DefaultColor);
        lbl3.setBackground(DefaultColor);
        lbl4.setBackground(DefaultColor);
        lbl5.setBackground(DefaultColor);
        
         
    }//GEN-LAST:event_lbl1MousePressed

    private void MenuNameMousePressed(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_MenuNameMousePressed
        // TODO add your handling code here:
    }//GEN-LAST:event_MenuNameMousePressed

    private void Menu1MouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_Menu1MouseClicked
    Form1Menu form = new  Form1Menu();
    form.setSize(FormPanel.getSize());
    form.setLocation(0, 0);

    FormPanel.removeAll();
    FormPanel.setLayout(new java.awt.BorderLayout());
    FormPanel.add(form, java.awt.BorderLayout.CENTER);

    FormPanel.revalidate();
    FormPanel.repaint();
    }//GEN-LAST:event_Menu1MouseClicked

    private void Menu2MouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_Menu2MouseClicked
    Form2Menu form = new Form2Menu();
    form.setSize(FormPanel.getSize());
    form.setLocation(0, 0);

    FormPanel.removeAll();
    FormPanel.setLayout(new java.awt.BorderLayout());
    FormPanel.add(form, java.awt.BorderLayout.CENTER);

    FormPanel.revalidate();
    FormPanel.repaint();
    
    }//GEN-LAST:event_Menu2MouseClicked

    private void Menu3MouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_Menu3MouseClicked
    Form3Menu form = new Form3Menu();
    form.setSize(FormPanel.getSize());
    form.setLocation(0, 0);

    FormPanel.removeAll();
    FormPanel.setLayout(new java.awt.BorderLayout());
    FormPanel.add(form, java.awt.BorderLayout.CENTER);

    FormPanel.revalidate();
    FormPanel.repaint();
    }//GEN-LAST:event_Menu3MouseClicked

    private void Menu4MouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_Menu4MouseClicked
     Form4Menu form = new Form4Menu();

    form.setSize(FormPanel.getSize());
    form.setLocation(0, 0);

    FormPanel.removeAll();
    FormPanel.setLayout(new java.awt.BorderLayout());
    FormPanel.add(form, java.awt.BorderLayout.CENTER);
    FormPanel.revalidate();
    FormPanel.repaint();
    }//GEN-LAST:event_Menu4MouseClicked

    private void Menu5MouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_Menu5MouseClicked
             Menu5MousePressed(evt);
    }//GEN-LAST:event_Menu5MouseClicked

    private void lblMinMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_lblMinMouseClicked
            if ((getExtendedState() & JFrame.MAXIMIZED_BOTH) == JFrame.MAXIMIZED_BOTH) {

        setExtendedState(JFrame.NORMAL);
    } else {
    
        setExtendedState(JFrame.MAXIMIZED_BOTH);
    }
    }//GEN-LAST:event_lblMinMouseClicked

    private void lblXMousePressed(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_lblXMousePressed
        //here
        
    }//GEN-LAST:event_lblXMousePressed

   
    
    public static void main(String args[]) {

        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html 
         */
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ReflectiveOperationException | javax.swing.UnsupportedLookAndFeelException ex) {
            logger.log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

     
        java.awt.EventQueue.invokeLater(() -> new dashBoard().setVisible(true));
        
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JPanel FormPanel;
    private javax.swing.JPanel Menu1;
    private javax.swing.JPanel Menu2;
    private javax.swing.JPanel Menu3;
    private javax.swing.JPanel Menu4;
    private javax.swing.JPanel Menu5;
    private javax.swing.JLabel MenuName;
    private SoftBorder.Border border1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JPanel jPanel4;
    private javax.swing.JPanel jPanel5;
    private javax.swing.JLabel lbl1;
    private javax.swing.JLabel lbl2;
    private javax.swing.JLabel lbl3;
    private javax.swing.JLabel lbl4;
    private javax.swing.JLabel lbl5;
    private javax.swing.JLabel lblMin;
    private javax.swing.JLabel lblX;
    private javax.swing.JPanel panelSlider;
    // End of variables declaration//GEN-END:variables
}
