/* ==========================================================================
   Shared Google Analytics 4 (GA4) Loader & Event Tracker
   Property: tbrinkley.github.io (Account: EDDI / 72005783)
   Measurement ID: G-73MT2SKH8F
   ========================================================================== */
(() => {
  const MEASUREMENT_ID = 'G-73MT2SKH8F';

  // Ignore local file:// and localhost previews so dev traffic does not skew GA4 stats
  const isLocalPreview =
    window.location.protocol === 'file:' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  if (isLocalPreview) {
    return;
  }

  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID);

  // Track helpful educator insights: student game launches, CBIS lab launches, and course tabs
  document.addEventListener('DOMContentLoaded', () => {
    // Detect direct visits to individual Unity student game pages
    const pathMatch = decodeURIComponent(window.location.pathname).match(/\/games\/([^/]+)\//i);
    if (pathMatch) {
      gtag('event', 'student_game_view', {
        game_name: pathMatch[1],
        page_path: window.location.pathname
      });
    }

    // Track clicks on student game links and interactive CS/CBIS labs
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href]');
      if (!link) return;

      const href = link.getAttribute('href') || '';
      const label = (link.textContent || '').replace(/\s+/g, ' ').trim();

      if (href.includes('/games/')) {
        gtag('event', 'student_game_click', {
          game_label: label,
          game_url: href
        });
      } else if (
        href.includes('atan2_explorer.html') ||
        href.includes('uptime-zero.html') ||
        href.includes('sausage_pizza_subnetting_lab.html') ||
        href.includes('network_ports_switch_lab.html') ||
        href.includes('qam_communications_simulator.html') ||
        href.includes('qam_sync_transmission_simulator.html') ||
        href.includes('qam_phase_shift_audio_demo.html') ||
        href.includes('qam_waveform_mapper.html') ||
        href.includes('physical_hardware_security_lab.html') ||
        href.includes('cbis13_rad_api_lab.html') ||
        href.includes('cbis13_agile_pivot_simulator.html') ||
        href.includes('cbis13_blockchain_smart_contracts_lab.html') ||
        href.includes('cbis13_competitive_advantage_simulator.html') ||
        href.includes('cbis13_ai_strategy_simulator.html') ||
        href.includes('cbis13_ar_vision_picking_lab.html') ||
        href.includes('cbis14_osint_high_desert_link.html') ||
        href.includes('cbis14_silent_echo_lab.html') ||
        href.includes('cbis14_xor_visualizer.html') ||
        href.includes('cbis14_logic_gate_simulator.html') ||
        href.includes('cbis14_cia_triad_balancer.html') ||
        href.includes('aztec-map-app.html') ||
        href.includes('static_electricity_simulator.html') ||
        href.includes('cvc_word_lab.html') ||
        href.includes('hosted.app') ||
        href.includes('web.app') ||
        href.includes('ai.studio')
      ) {
        gtag('event', 'interactive_lab_click', {
          lab_label: label,
          lab_url: href
        });
      }
    });

    // Track CBIS scrollytelling CRT monitor channel jumps
    document.querySelectorAll('.crt-channel-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        gtag('event', 'cbis_course_select', {
          course_name: (btn.textContent || '').trim()
        });
      });
    });
  });
})();
